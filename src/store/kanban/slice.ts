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
      state.kanbanItens.push(action.payload);
    },
    moveKanbanItem: (state, action: PayloadAction<KanbanItem>) => {
      const { id, boardId } = action.payload;
      const item = state.kanbanItens.find((item) => item.id === id);
      if (item) {
        item.boardId = boardId;
      }
    },
  },
});

export const { addTask, moveKanbanItem } = kanbanSlice.actions;
export const selectOptions = (state: RootState): BaseSelectOptions[] => {
  return state.kanban.boards.map((board) => ({
    label: board.title,
    value: String(board.id),
  }));
};
export default kanbanSlice.reducer;
