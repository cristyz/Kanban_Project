import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { initialKanbanState } from "./initialState";

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState: initialKanbanState,
  reducers: {
    // addTask: (state, action: PayloadAction<string>) => {
    //   state.tasks.push(action.payload);
    // },
  },
});

// export const { addTask } = kanbanSlice.actions;
export const selectTask = (state: RootState) => state.kanban;
export default kanbanSlice.reducer;
