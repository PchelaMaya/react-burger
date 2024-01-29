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

  async _fetchWithRefresh(url, options) {
    try {
      const res = await fetch(url, options);
      return await this._checkStatus(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await this.refreshToken();
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers.Authorization = `Bearer ${refreshData.accessToken}`;
        const res = await fetch(url, options);
        return await this._checkStatus(res);
      } else {
        throw err;
      }
    }
  }

  getIngredients() {
    return this._fetchWithRefresh(this._baseUrl + "/ingredients", {
      method: "GET",
      headers: this._headers,
    });
  }

  addOrder(ingredientsObj) {
    return this._fetchWithRefresh(this._baseUrl + "/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(ingredientsObj),
    });
  }

  createUser(name, email, password) {
    return this._fetchWithRefresh(this._baseUrl + "/auth/register", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
  }

  loginUser(email, password) {
    return this._fetchWithRefresh(this._baseUrl + "/auth/login", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  updateToken() {
    return this._fetchWithRefresh(this._baseUrl + "/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });
  }

  logoutUser() {
    return this._fetchWithRefresh(this._baseUrl + "/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });
  }

  getUser() {
    return this._fetchWithRefresh(this._baseUrl + "/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }

  updateUser(name, email) {
    return this._fetchWithRefresh(this._baseUrl + "/auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });
  }
  forgotPassword(email) {
    return this._fetchWithRefresh(this._baseUrl + "/password-reset", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
      }),
    });
  }

  resetPassword(password, token) {
    return this._fetchWithRefresh(this._baseUrl + "/password-reset/reset", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    });
  }
}

export const requestApi = new RequestApi({
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
});
