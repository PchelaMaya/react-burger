class RequestApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getIngredients() {
    return fetch(this._baseUrl + "/ingredients", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkStatus);
  }

  addOrder(ingredientsObj) {
    return fetch(this._baseUrl + "/orders", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(ingredientsObj),
    }).then(this._checkStatus);
  }
}

export const requestApi = new RequestApi({
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
});
