import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { loadState, saveState } from "./localStorage";
import globalReducer from "@/state";
import { api } from "@/state/api";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const preloadedState = loadState();

const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
