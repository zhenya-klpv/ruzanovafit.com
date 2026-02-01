/**
 * Netlify Function: Yelp Reviews with cache
 * Set YELP_API_KEY in Netlify env
 */
const YELP_BUSINESS_ID = 'elena-ruzanova-personal-trainer-and-nutritionist-san-jose';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

let cached = null;
let cacheTime = 0;

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (cached && Date.now() - cacheTime < CACHE_TTL_MS) {
    return { statusCode: 200, headers, body: JSON.stringify(cached) };
  }

  const apiKey = process.env.YELP_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'YELP_API_KEY not configured', reviews: [] }),
    };
  }

  try {
    const res = await fetch(
      `https://api.yelp.com/v3/businesses/${YELP_BUSINESS_ID}/reviews`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    if (!res.ok) {
      return {
        statusCode: res.status,
        headers,
        body: JSON.stringify({ error: 'Yelp API error', reviews: [] }),
      };
    }
    const data = await res.json();
    const reviews = (data.reviews || []).map((r) => ({
      rating: r.rating,
      text: r.text,
      time_created: r.time_created,
      user: { name: r.user?.name || 'Anonymous', location: r.user?.location || 'California' },
      url: r.url,
    }));
    cached = { reviews };
    cacheTime = Date.now();
    return { statusCode: 200, headers, body: JSON.stringify(cached) };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message, reviews: [] }),
    };
  }
};
