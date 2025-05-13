const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: $(res.status)`);
  });
}

function addNewClothes(data) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
}

function deleteItems(item_id) {
  return fetch(`${baseUrl}/items/${item_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return;
    }
    return Promise.reject(`Error: ${res.status}`);
  });
}

const api = {
  deleteItems,
  addNewClothes,
  getItems,
};

export default api;
