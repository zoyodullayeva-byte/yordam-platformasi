export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const TOKEN_KEY = "yp_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, { ...options, headers });
  } catch (e) {
    throw new Error(
      "Serverga ulanib bo'lmadi. Backend ishga tushirilganini tekshiring (npm start) va VITE_API_URL to'g'riligiga ishonch hosil qiling."
    );
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // javob tanasi bo'sh bo'lishi mumkin
  }

  if (!res.ok) {
    throw new Error((data && data.error) || `Xatolik: ${res.status}`);
  }
  return data;
}

export const api = {
  health: () => request("/api/health"),

  list: (resource) => request(`/api/${resource}`),
  orgs: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null))
    ).toString();
    return request(`/api/orgs${qs ? `?${qs}` : ""}`);
  },

  contact: (payload) => request("/api/contact", { method: "POST", body: JSON.stringify(payload) }),

  oneidStatus: () => request("/api/auth/oneid/status"),
  oneidLoginUrl: () => `${API_URL}/api/auth/oneid/login`,
  demoLogin: (payload) => request("/api/auth/demo-login", { method: "POST", body: JSON.stringify(payload) }),
  me: () => request("/api/auth/me"),

  adminStats: () => request("/api/admin/stats"),
  adminContacts: () => request("/api/admin/contacts"),
  adminUsers: () => request("/api/admin/users"),
};
