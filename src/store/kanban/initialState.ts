import { KanbanState } from "./interface";

export const initialKanbanState: KanbanState = {
  projectSelectedId: 1,
  setKanbanItemIdToEdit: null,
  projects: [
    {
      id: 1,
      title: "Platform Launch",
    },
    {
      id: 2,
      title: "Marketing Plan",
    },
  ],
  boards: [
    {
      id: 1,
      title: "Todo",
      projectId: 1,
    },
    {
      id: 2,
      title: "Done",
      projectId: 1,
    },
    {
      id: 3,
      title: "New Board",
      projectId: 2,
    },
  ],
  kanbanItens: [
    {
      id: 1,
      boardId: 1,
      title: "Build Ui for onboarding flow Build",
      description: "Build Ui for onboarding flow Build Ui for onboarding flow",
      position: 1,
    },
    {
      id: 2,
      boardId: 2,
      title: "Check if the user is logged",
      description: "Check if the user is logged in the app",
      position: 1,
    },
    {
      id: 3,
      title: "Fix the bug on the login screen",
      position: 2,
      boardId: 2,
    },
  ],
};
