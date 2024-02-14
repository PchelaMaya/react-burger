export type TClosePopup = {
  onClose: () => void;
};

export type TModal = TClosePopup & {
  children?: React.ReactNode;
};

export type TIngredientObj = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
};

export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TUserObj = {
  email: string;
  name: string;
};

export type TIngredients = TServerResponse<{
  data: TIngredientObj;
}>;

export type TOrderObj = {
  number: number;
};

export type TOrderAdd = TServerResponse<{
  name: string;
  order: TOrderObj;
  success: boolean;
}>;

export type TUserCreate = TServerResponse<{
  user: TUserObj;
  accessToken: string;
  refreshToken: string;
}>;

export type TUserLogin = TServerResponse<{
  user: TUserObj;
  accessToken: string;
  refreshToken: string;
}>;

export type TUpdateToken = TServerResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export type TMessageResponse = TServerResponse<{
  message: string;
}>;

export type TGetUser = TServerResponse<{
  user: TUserObj;
}>;

export type TIngredientId = {
  ingredients: Array<string>;
};

export type TIngredientObjConstructor = TIngredientObj & {
  readonly uniqId: string;
};
