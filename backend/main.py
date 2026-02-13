import os
import time
from collections import defaultdict, deque
from typing import Any

import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Ruzanova Fitness API")

frontend_origin_raw = os.getenv("FRONTEND_ORIGIN", "http://localhost:3001")
allowed_origins = [origin.strip() for origin in frontend_origin_raw.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

YELP_BUSINESS_ID = os.getenv(
    "YELP_BUSINESS_ID",
    "elena-ruzanova-personal-trainer-and-nutritionist-san-jose",
)
YELP_API_KEY = os.getenv("YELP_API_KEY", "")
YELP_CACHE_TTL_SECONDS = int(os.getenv("YELP_CACHE_TTL_SECONDS", "3600"))
REVIEWS_RATE_LIMIT_PER_MINUTE = int(os.getenv("REVIEWS_RATE_LIMIT_PER_MINUTE", "60"))

_cache_reviews: list[dict[str, Any]] | None = None
_cache_timestamp = 0.0
_ip_windows: dict[str, deque[float]] = defaultdict(deque)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/yelp-reviews")
async def yelp_reviews(request: Request) -> dict[str, Any]:
    global _cache_reviews, _cache_timestamp

    ip = request.client.host if request.client else "unknown"
    now = time.time()
    window = _ip_windows[ip]
    while window and (now - window[0]) > 60:
        window.popleft()
    if len(window) >= REVIEWS_RATE_LIMIT_PER_MINUTE:
        raise HTTPException(status_code=429, detail="Too many requests")
    window.append(now)

    if _cache_reviews and (now - _cache_timestamp) < YELP_CACHE_TTL_SECONDS:
        return {"reviews": _cache_reviews, "cached": True}

    if not YELP_API_KEY:
        raise HTTPException(status_code=500, detail="YELP_API_KEY is not configured")

    url = f"https://api.yelp.com/v3/businesses/{YELP_BUSINESS_ID}/reviews"
    headers = {"Authorization": f"Bearer {YELP_API_KEY}"}

    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.get(url, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Yelp API request failed")

    data = response.json()
    normalized = []
    for review in data.get("reviews", []):
        normalized.append(
            {
                "rating": review.get("rating"),
                "text": review.get("text"),
                "time_created": review.get("time_created"),
                "url": review.get("url"),
                "user": {
                    "name": review.get("user", {}).get("name") or "Verified Yelp Client",
                    "location": "California",
                },
            }
        )

    _cache_reviews = normalized
    _cache_timestamp = time.time()
    return {"reviews": normalized, "cached": False}
