import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseSelectOptions } from "../../components/FormComponents/BaseSelect/BaseSelect";
import type { RootState } from "../index";
import { initialKanbanState } from "./initialState";
import { KanbanItem } from "./interface";

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState: initialKanbanState,
  reducers: {
    changeProjectSelectedId: (state, action: PayloadAction<number>) => {
      state.projectSelectedId = action.payload;
    },
    addTask: (state, action: PayloadAction<KanbanItem>) => {
      state.kanbanItens.push(action.payload);
    },
    moveKanbanItemToNewBoard: (state, action: PayloadAction<KanbanItem>) => {
      const { id, boardId } = action.payload;
      const item = state.kanbanItens.find((item) => item.id === id);
      const oldBoard = state.boards.find((board) => board.id === item?.boardId);
      const newBoard = state.boards.find((board) => board.id === boardId);

      const oldBoardItens = state.kanbanItens.filter(
        (item) => item.boardId === oldBoard?.id
      );
      const newBoardItens = state.kanbanItens.filter(
        (item) => item.boardId === newBoard?.id
      );
      const itensInOldBoardWithPositionHigherThanItem = oldBoardItens.filter(
        (itenInOldBoard) => itenInOldBoard.position > item!.position
      );

      if (item && oldBoard && newBoard && oldBoard.id !== newBoard.id) {
        itensInOldBoardWithPositionHigherThanItem.forEach(
          (item) => (item.position -= 1)
        );
        item.boardId = newBoard.id;
        item.position = newBoardItens.length + 1;
      }
    },
  },
});

export const { changeProjectSelectedId, addTask, moveKanbanItemToNewBoard } =
  kanbanSlice.actions;

export const selectOptions = (state: RootState): BaseSelectOptions[] => {
  return state.kanban.boards.map((board) => ({
    label: board.title,
    value: String(board.id),
  }));
};
export default kanbanSlice.reducer;
