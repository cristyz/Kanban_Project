import { configureStore } from "@reduxjs/toolkit";
import { loadReduxState, saveReduxState } from "../helpers/browser-storage";
import { kanbanSlice } from "./kanban/slice";

const store = configureStore({
  reducer: {
    kanban: kanbanSlice.reducer,
  },
  preloadedState: loadReduxState(),
});

store.subscribe(() => saveReduxState(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
