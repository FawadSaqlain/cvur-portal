function getStoredToken() {
  return localStorage.getItem('adminToken') || localStorage.getItem('token') || null;
}

// Base URL for API; in production set VITE_API_URL to https://....com
const API_BASE = import.meta.env.VITE_API_URL || '';

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});

  if (!headers.has('Accept')) headers.set('Accept', 'application/json');

  const token = getStoredToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', 'Bearer ' + token);
  }

  const url = API_BASE + path;

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: 'same-origin'
  });

  let json = null;
  try {
    json = await res.json();
  } catch (e) {
    json = null;
  }

  if (!res.ok) {
    const msg = (json && json.error && json.error.message) || (json && json.message) || `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    err.payload = json;
    throw err;
  }

  return json;
}
