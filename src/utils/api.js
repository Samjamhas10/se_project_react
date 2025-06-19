const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(checkResponse)
    .then((items) => items.reverse());
}

function addNewClothes(data, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

function deleteItems(item_id) {
  return fetch(`${baseUrl}/items/${item_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

const api = {
  getItems,
  addNewClothes,
  deleteItems,
};

export default api;
