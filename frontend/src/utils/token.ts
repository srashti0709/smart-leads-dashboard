const TOKEN_KEY = "token";

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// 🔥 Decode JWT payload (no library needed)
export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload; // contains id, role, etc.
  } catch (err) {
    return null;
  }
};

export const getUserRole = (): "Admin" | "Sales" | null => {
  const user = getUserFromToken();
  return user?.role || null;
};