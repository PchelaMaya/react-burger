import { TIngredientObj } from "./types";

const BASE_URL = "https://norma.nomoreparties.space/api";
class RequestApi {
  private _checkStatus(res: Response) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append("Content-Type", "application/json;charset=utf-8");
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.append("authorization", accessToken);
    }
    return headers;
  }

  updateToken() {
    return fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then((res) => {
      return this._checkStatus(res);
    });
  }

  private _fetchWithRefresh = async (url: string, options: RequestInit) => {
    try {
      const res = await fetch(url, options);
      return await this._checkStatus(res);
    } catch (err: any) {
      if (err.message === "jwt expired") {
        const refreshData = await this.updateToken();
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers = {
          ...options.headers,
          authorization: `Bearer ${refreshData.accessToken}`,
        };
        const res = await fetch(url, options);
        return await this._checkStatus(res);
      } else {
        throw err;
      }
    }
  };

  getIngredients() {
    return this._fetchWithRefresh(`${BASE_URL}/ingredients`, {
      method: "GET",
      headers: this.getHeaders(),
    });
  }

  addOrder(ingredientsObj: Array<TIngredientObj>) {
    return this._fetchWithRefresh(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(ingredientsObj),
    });
  }

  createUser(name: string, email: string, password: string) {
    return this._fetchWithRefresh(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
  }

  loginUser(email: string, password: string) {
    return this._fetchWithRefresh(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  logoutUser() {
    return this._fetchWithRefresh(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });
  }

  getUser() {
    return this._fetchWithRefresh(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: this.getHeaders(),
    });
  }

  updateUser(name: string, email: string, password: string) {
    return this._fetchWithRefresh(`${BASE_URL}/auth/user`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
  }
  forgotPassword(email: string) {
    return this._fetchWithRefresh(`${BASE_URL}/password-reset`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        email: email,
      }),
    });
  }

  resetPassword(password: string, token: string) {
    return this._fetchWithRefresh(`${BASE_URL}/password-reset/reset`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    });
  }
}

export const requestApi = new RequestApi();
