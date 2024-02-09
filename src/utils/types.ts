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

export type TGetUser = TServerResponse<{
  user: TUserObj;
}>;

export type TUserObj = {
  email: string;
  name: string;
};

export type TOrderObj = {
  number: number;
};
