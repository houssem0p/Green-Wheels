const API = '/api';

async function parseJson(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { message: text || 'Invalid response' };
  }
}

export async function apiRegister(body) {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const data = await parseJson(res);
  return { ok: res.ok, status: res.status, data };
}

export async function apiLogin(body) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const data = await parseJson(res);
  return { ok: res.ok, status: res.status, data };
}

export async function apiLogout() {
  const res = await fetch(`${API}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  const data = await parseJson(res);
  return { ok: res.ok, data };
}

export async function apiForgotPassword(body) {
  const res = await fetch(`${API}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const data = await parseJson(res);
  return { ok: res.ok, status: res.status, data };
}

export async function apiResetPassword(body) {
  const res = await fetch(`${API}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const data = await parseJson(res);
  return { ok: res.ok, status: res.status, data };
}

export async function apiMe() {
  const res = await fetch(`${API}/auth/me`, { credentials: 'include' });
  const data = await parseJson(res);
  return { ok: res.ok, data };
}
