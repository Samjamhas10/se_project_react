export const BASE_URL = "http://localhost:3001"; // where the backend is running

// this function sends a request to create a new user
export const register = (email, password, name, avatar) => {
  // send a request to the /signup endpoint
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

// this function logs the user in with email and password
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }), // convert email and password to JSON
  }).then((res) => {
    // return response if successful, otherwise reject the promise/ send an error
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

// this function checks if the token is valid and returns user info
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json(); // if token is valid, return user info
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};
