import {
  useDispatch as dispatch,
  useSelector as selector,
  TypedUseSelectorHook,
} from "react-redux";
import { rootReducer } from "../services/reducers/rootReducer";
import store from "../services/store";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type DispatchFunc = () => AppDispatch;

export const useSelector: TypedUseSelectorHook<RootState> = selector;

export const useAppDispatch: () => AppDispatch = dispatch;
