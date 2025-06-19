const TOKEN_KEY = "jwt";

export const storeToken = (token) => localStorage.setItem("jwt", token);

export const getToken = () => localStorage.getItem("jwt");

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
