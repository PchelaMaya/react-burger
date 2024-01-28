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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(ingredientsObj),
    }).then(this._checkStatus);
  }

  createUser(name, email, password) {
    return fetch(this._baseUrl + "/auth/register", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then(this._checkStatus);
  }

  loginUser(email, password) {
    return fetch(this._baseUrl + "/auth/login", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._checkStatus);
  }

  updateToken() {
    return fetch(this._baseUrl + "/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }),
    }).then(this._checkStatus);
  }

  logoutUser() {
    return fetch(this._baseUrl + "/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }),
    }).then(this._checkStatus);
  }

  getUser(dispatch, GET_USER_REQUEST, GET_USER_SUCCESS, errFunc) {
    dispatch({ type: GET_USER_REQUEST });

    return fetch(this._baseUrl + "/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then(this._checkStatus)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            payload: {
              user: res.user,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (errFunc && localStorage.getItem("refreshToken")) {
          dispatch(errFunc());
        }
      });
  }

  updateUser(name, email) {
    return fetch(this._baseUrl + "/auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._checkStatus);
  }
  forgotPassword(email) {
    return fetch(this._baseUrl + "/password-reset", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
      }),
    }).then(this._checkStatus);
  }

  resetPassword(password, token) {
    return fetch(this._baseUrl + "/password-reset/reset", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    }).then(this._checkStatus);
  }
}

export const requestApi = new RequestApi({
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
});
