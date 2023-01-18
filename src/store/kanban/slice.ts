import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseSelectOptions } from "../../components/FormComponents/BaseSelect/BaseSelect";
import type { RootState } from "../index";
import { initialKanbanState } from "./initialState";
import { KanbanItem } from "./interface";

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState: initialKanbanState,
  reducers: {
    addTask: (state, action: PayloadAction<KanbanItem>) => {
      const { boardId } = action.payload;
      const board = state.boards.find((board) => board.id === boardId);
      if (board) {
        board.kanbanItens.push(action.payload);
      }
    },
  },
});

export const { addTask } = kanbanSlice.actions;
export const selectTask = (state: RootState) => state.kanban;
export const selectOptions = (state: RootState): BaseSelectOptions[] => {
  return state.kanban.boards.map((board) => ({
    label: board.title,
    value: String(board.id),
  }));
};
export default kanbanSlice.reducer;
