/**
 * Google API Configuration & Utilities
 * 
 * The API key is stored in .env.local (never committed)
 * In Astro, server-side code accesses it via import.meta.env
 */

// ✅ SERVER-SIDE: Accessing API Key (secret, not exposed to browser)
export const getGoogleApiKey = () => {
  const key = import.meta.env.GOOGLE_API_KEY;
  if (!key) {
    console.warn('⚠️ Google API Key not found in environment variables');
    return null;
  }
  return key;
};

// ✅ CLIENT-SIDE: Public API Key (safe to expose, use VITE_ prefix)
export const getPublicGoogleApiKey = () => {
  const key = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!key) {
    console.warn('⚠️ Public Google API Key not found in environment variables');
    return null;
  }
  return key;
};

// ✅ EXAMPLE: Fetch data from Google API (server-side in .astro file)
export const fetchFromGoogleAPI = async (endpoint: string) => {
  const apiKey = getGoogleApiKey();
  if (!apiKey) {
    throw new Error('Google API Key is not configured');
  }

  const url = `https://www.googleapis.com${endpoint}?key=${apiKey}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return await response.json();
};

// ✅ EXAMPLE: Use in Stitch MCP client (if using MCP)
export const getStitchConfig = () => {
  return {
    servers: {
      stitch: {
        type: 'http',
        url: 'https://stitch.googleapis.com/mcp',
        headers: {
          'X-Goog-Api-Key': getGoogleApiKey() || '',
        },
      },
    },
  };
};

