import {
  TGetUser,
  TIngredientObj,
  TIngredients,
  TMessageResponse,
  TOrderAdd,
  TOrderRes,
  TUpdateToken,
  TUserCreate,
  TUserLogin,
} from "./types";

const BASE_URL = "https://norma.nomoreparties.space/api";
class RequestApi {
  _checkStatus<T>(res: Response): Promise<T> {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
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

  updateToken(): Promise<TUpdateToken> {
    return fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then((res) => {
      return this._checkStatus<TUpdateToken>(res);
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

  getIngredients(): Promise<TIngredients> {
    return fetch(`${BASE_URL}/ingredients`, {
      method: "GET",
      headers: this.getHeaders(),
    }).then((res) => {
      return this._checkStatus<TIngredients>(res);
    });
  }

  addOrder(ingredientsObj: Array<TIngredientObj>): Promise<TOrderAdd> {
    return this._fetchWithRefresh(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(ingredientsObj),
    }).then((res: any) => {
      return this._checkStatus<TOrderAdd>(res);
    });
  }

  getOrder(number: string): Promise<TOrderRes> {
    return fetch(`${BASE_URL}/orders/${number}`, {
      method: "GET",
      headers: this.getHeaders(),
    }).then((res) => this._checkStatus<TOrderRes>(res));
  }

  createUser(
    name: string,
    email: string,
    password: string
  ): Promise<TUserCreate> {
    return fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then((res) => {
      return this._checkStatus<TUserCreate>(res);
    });
  }

  loginUser(email: string, password: string): Promise<TUserLogin> {
    return fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      return this._checkStatus<TUserLogin>(res);
    });
  }

  logoutUser(): Promise<TMessageResponse> {
    return fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then((res) => {
      return this._checkStatus<TMessageResponse>(res);
    });
  }

  getUser(): Promise<TGetUser> {
    return fetch(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      return this._checkStatus<TGetUser>(res);
    });
  }

  updateUser(name: string, email: string, password: string): Promise<TGetUser> {
    return fetch(`${BASE_URL}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then((res) => {
      return this._checkStatus<TGetUser>(res);
    });
  }

  forgotPassword(email: string): Promise<TMessageResponse> {
    return fetch(`${BASE_URL}/password-reset`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        email: email,
      }),
    }).then((res) => {
      return this._checkStatus<TMessageResponse>(res);
    });
  }

  resetPassword(password: string, token: string): Promise<TMessageResponse> {
    return fetch(`${BASE_URL}/password-reset/reset`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    }).then((res) => {
      return this._checkStatus<TMessageResponse>(res);
    });
  }
}

export const requestApi = new RequestApi();
