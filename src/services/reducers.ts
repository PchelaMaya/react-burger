import { RootState } from "./store";

export const getBurgerConstructorIngredients = (state: RootState) => {
  return state.burgerConstructor.constructorIngredients;
};

export const getTotalPrice = (state: RootState) => {
  return state.burgerConstructor.totalPrice;
};

export const getIsOpenedPopupIngredient = (state: RootState) => {
  return state.ingredientDetails.isPopupOpened;
};

export const getNumberOrder = (state: RootState) => {
  return state.order.lastNumberOrder;
};

export const getIsLoadingOrder = (state: RootState) => {
  return state.order.isLoading;
};

export const getIsOrders = (state: RootState) => {
  return state.order.orders;
};

export const getIsOpenedPopupOrder = (state: RootState) => {
  return state.order.isOpenOrderPopup;
};

export const getIsLoggedIn = (state: RootState) => {
  return state.currentUser.isLoggedIn;
};

export const getIsLoading = (state: RootState) => {
  return state.currentUser.isLoading;
};

export const getCurrentUser = (state: RootState) => {
  return state.currentUser.currentUser;
};

export const getIngredients = (state: RootState) => {
  return state.ingredients.ingredients;
};

export const getIsOpenResetPasswordPage = (state: RootState) => {
  return state.resetPassword.isOpenResetPasswordPage;
};

export const getWSOrders = (state: RootState) => {
  return state.wsOrders.orders;
};

export const getWSCountToday = (state: RootState) => {
  return state.wsOrders.totalToday;
};

export const getWSCount = (state: RootState) => {
  return state.wsOrders.total;
};

export const getOrderLoading = (state: RootState) => {
  return state.order.isLoading;
};

export const getUserOrders = (state: RootState) => {
  return state.wsUserOrders.userOrders;
};

export const getCurrentUserAccessToken = (state: RootState) => {
  return state.currentUser.accessToken;
};
