import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseSelectOptions } from "../../components/FormComponents/BaseSelect/BaseSelect";
import { useAppDispatch } from "../hooks";
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
    updateTask: (state, action: PayloadAction<KanbanItem>) => {
      const { id, title, description, boardId } = action.payload;
      const item = state.kanbanItens.find((item) => item.id === id);
      if (!item) return console.error("item not found");

      item.title = title;
      item.description = description;

      if (item.boardId != boardId) {
        kanbanSlice.caseReducers.moveKanbanItemToNewBoard(state, action);
      }
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

      if (!item || !oldBoard || !newBoard)
        return console.error("item or oldBoard or newBoard not found");
      if (oldBoard.id === newBoard.id)
        return console.error("old board and new board are the same");

      itensInOldBoardWithPositionHigherThanItem.forEach(
        (item) => (item.position -= 1)
      );
      item.boardId = newBoard.id;
      item.position = newBoardItens.length + 1;
    },
    changeKanbanItemPositionInSameBoard: (
      state,
      action: PayloadAction<KanbanItem>
    ) => {
      const { id, position: newItemPosition } = action.payload;
      const item = state.kanbanItens.find((item) => item.id === id);
      const board = state.boards.find((board) => board.id === item?.boardId);
      const itemInNewPosition = state.kanbanItens.find(
        (item) =>
          item.boardId === board?.id && item.position === newItemPosition
      );

      if (!item || !board || !itemInNewPosition)
        return console.error("item or board or itemInNewPosition not found");

      itemInNewPosition.position = item.position;
      item.position = newItemPosition;
    },
    changeKanbanItemPositionInDifferentBoard: (
      state,
      action: PayloadAction<KanbanItem>
    ) => {
      const {
        id,
        position: newItemPosition,
        boardId: newBoardId,
      } = action.payload;
      const item = state.kanbanItens.find((item) => item.id === id);
      const itensInNewBoardWithPositionHigherThanItem =
        state.kanbanItens.filter(
          (item) =>
            item.boardId === newBoardId && item.position >= newItemPosition
        );

      if (!item) return console.error("item not found");

      itensInNewBoardWithPositionHigherThanItem.forEach(
        (item) => item.position++
      );

      item.boardId = newBoardId;
      item.position = newItemPosition;
    },
    setKanbanItemIdToEdit: (state, action: PayloadAction<number | null>) => {
      state.setKanbanItemIdToEdit = action.payload;
    },
  },
});

export const {
  changeProjectSelectedId,
  addTask,
  updateTask,
  moveKanbanItemToNewBoard,
  changeKanbanItemPositionInSameBoard,
  changeKanbanItemPositionInDifferentBoard,
  setKanbanItemIdToEdit,
} = kanbanSlice.actions;

export const selectOptions = (state: RootState): BaseSelectOptions[] => {
  const projectSelectedId = state.kanban.projectSelectedId;
  if (!projectSelectedId) return [];

  const project = state.kanban.projects.find(
    (project) => project.id === projectSelectedId
  );
  if (!project) return [];

  const boards = state.kanban.boards.filter(
    (board) => board.projectId === project.id
  );

  return boards.map((board) => ({
    label: board.title,
    value: String(board.id),
  }));
};
export default kanbanSlice.reducer;
