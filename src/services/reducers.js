export const getBurgerConstructorIngredients = (state) => {
  return state.burgerConstructor.constructorIngredients;
};

export const getTotalPice = (state) => {
  return state.burgerConstructor.totalPrice;
};

export const getIsOpenedPopupIngredient = (state) => {
  return state.ingredientDetails.isPopupOpened;
};

export const getNumberOrder = (state) => {
  return state.order.lastNumberOrder;
};

export const getIsOpenedPopupOrder = (state) => {
  return state.order.isOpenOrderPopup;
};

export const getIngredients = (state) => {
  return state.ingredients.ingredients;
};

export const getIsLoggedIn = (state) => {
  return state.currentUser.isLoggedIn;
};

export const getCurrentUser = (state) => {
  return state.currentUser.currentUser;
};

export const getIsLoading = (state) => {
  return state.currentUser.isLoading;
};

export const getIsLoadingOrder = (state) => {
  return state.order.isLoading;
};
