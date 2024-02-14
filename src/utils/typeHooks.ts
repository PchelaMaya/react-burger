import {
  useDispatch as dispatch,
  useSelector as selector,
  TypedUseSelectorHook,
} from "react-redux";
import { store } from "../services/store";
import { rootReducer } from "../services/reducers/rootReducer";

export type AppDispacth = typeof store.dispatch;

export type DispatchFunc = () => AppDispacth;
export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = selector;

export const useDispatch: DispatchFunc = dispatch;
