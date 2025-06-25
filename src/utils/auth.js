export const BASE_URL = "http://localhost:3001"; // where the backend is running

import { checkResponse } from "./api";

// this function sends a request to create a new user
export const register = (email, password, name, avatar) => {
  // send a request to the /signup endpoint
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(checkResponse);
};

// this function logs the user in with email and password
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }), // convert email and password to JSON
  }).then(checkResponse);
};

// this function checks if the token is valid and returns user info
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
