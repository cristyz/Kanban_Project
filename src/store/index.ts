import { configureStore } from "@reduxjs/toolkit";
import { kanbanSlice } from "./kanban/slice";

const store = configureStore({
  reducer: {
    kanban: kanbanSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
