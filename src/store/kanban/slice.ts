import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseSelectOptions } from "../../components/FormComponents/BaseSelect/BaseSelect";
import { useAppDispatch } from "../hooks";
import type { RootState } from "../index";
import { initialKanbanState } from "./initialState";
import { KanbanBoard, KanbanItem, KanbanProject } from "./interface";

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
    createNewProject: (state) => {
      const newProject = {
        id: Math.floor(Math.random() * 999999),
        title: "New Project",
      };
      state.projects.push(newProject);
    },
    createNewBoard: (state) => {
      const newBoard = {
        id: Math.floor(Math.random() * 999999),
        title: "New Board",
        projectId: state.projectSelectedId,
      };
      state.boards.push(newBoard);
    },
    updateBoard: (state, action: PayloadAction<KanbanBoard>) => {
      const { id, title } = action.payload;
      const board = state.boards.find((board) => board.id === id);
      if (!board) return console.error("board not found");

      board.title = title;
    },
    removeBoard: (state, action: PayloadAction<KanbanBoard>) => {
      const { id } = action.payload;
      const board = state.boards.find((board) => board.id === id);
      if (!board) return console.error("board not found");

      const itensInBoard = state.kanbanItens.filter(
        (item) => item.boardId === board.id
      );
      itensInBoard.forEach((item) => {
        const index = state.kanbanItens.indexOf(item);
        state.kanbanItens.splice(index, 1);
      });

      const index = state.boards.indexOf(board);
      state.boards.splice(index, 1);
    },
    removeProject: (state, action: PayloadAction<KanbanProject>) => {
      const { id } = action.payload;
      const project = state.projects.find((project) => project.id === id);
      if (!project) return console.error("project not found");

      const boardsInProject = state.boards.filter(
        (board) => board.projectId === project.id
      );
      boardsInProject.forEach((board) => {
        kanbanSlice.actions.removeBoard(board);
      });

      const index = state.projects.indexOf(project);
      state.projects.splice(index, 1);

      if (state.projectSelectedId === project.id) state.projectSelectedId = 1;
    },
    removeKanbanItem: (state, action: PayloadAction<KanbanItem>) => {
      const { id } = action.payload;
      const item = state.kanbanItens.find((item) => item.id === id);
      if (!item) return console.error("item not found");

      const itensInBoardWithPositionHigherThanItem = state.kanbanItens.filter(
        (item) => item.boardId === item.boardId && item.position > item.position
      );
      itensInBoardWithPositionHigherThanItem.forEach(
        (item) => (item.position -= 1)
      );

      const index = state.kanbanItens.indexOf(item);
      state.kanbanItens.splice(index, 1);
    },
    updateProject: (state, action: PayloadAction<KanbanProject>) => {
      const { id, title } = action.payload;
      const project = state.projects.find((project) => project.id === id);
      if (!project) return console.error("project not found");

      project.title = title;
    },
  },
});

export const {
  changeProjectSelectedId,
  addTask,
  createNewProject,
  createNewBoard,
  updateBoard,
  removeBoard,
  removeProject,
  removeKanbanItem,
  updateProject,
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
