const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const url = API_BASE ? API_BASE.replace(/\/$/, '') + path : path;
  const res = await fetch(url, init);
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Request failed');
  }
  return res.json();
}
