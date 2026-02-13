/**
 * Netlify Function: Yelp reviews proxy with in-memory cache.
 * Requires YELP_API_KEY in Netlify environment variables.
 */
const YELP_BUSINESS_ID =
  process.env.YELP_BUSINESS_ID ||
  "elena-ruzanova-personal-trainer-and-nutritionist-san-jose";
const CACHE_TTL_MS = Number(process.env.YELP_CACHE_TTL_SECONDS || "3600") * 1000;

let cachedPayload = null;
let cacheTime = 0;

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (cachedPayload && Date.now() - cacheTime < CACHE_TTL_MS) {
    return { statusCode: 200, headers, body: JSON.stringify(cachedPayload) };
  }

  const apiKey = process.env.YELP_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "YELP_API_KEY not configured", reviews: [] }),
    };
  }

  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/${YELP_BUSINESS_ID}/reviews`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      },
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: "Yelp API error", reviews: [] }),
      };
    }

    const data = await response.json();
    const reviews = (data.reviews || []).map((review) => ({
      rating: review.rating,
      text: review.text,
      time_created: review.time_created,
      url: review.url,
      user: {
        name: review.user?.name || "Verified Yelp Client",
        location: review.user?.location || "California",
      },
    }));

    cachedPayload = { reviews };
    cacheTime = Date.now();
    return { statusCode: 200, headers, body: JSON.stringify(cachedPayload) };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: String(error), reviews: [] }),
    };
  }
};
