const baseUrl = "http://localhost:3001";

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getItems() {
    return fetch(`${this._baseUrl}/items`)
      .then(this._checkResponse)
      .then((items) => items.reverse());
  }

  addNewClothes(data) {
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  deleteItems(item_id) {
    return fetch(`${this._baseUrl}/items/${item_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
}

const api = new Api(baseUrl);

export default api;
