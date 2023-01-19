import { KanbanState } from "./interface";

export const initialKanbanState: KanbanState = {
  projectSelectedId: 1,
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
  ],
  kanbanItens: [
    {
      id: 1,
      boardId: 1,
      title: "Build Ui for onboarding flow Build",
      position: 1,
      subtasks: [
        {
          id: 1,
          title: "Subtask 1",
          completed: false,
        },
      ],
    },
    {
      id: 2,
      boardId: 2,
      title: "Check if the user is logged",
      position: 1,
      subtasks: [
        {
          id: 2,
          title: "Subtask 2",
          completed: false,
        },
      ],
    },
    {
      id: 3,
      title: "Fix the bug on the login screen",
      position: 2,
      boardId: 2,
      subtasks: [
        {
          id: 3,
          title: "Subtask 3",
          completed: true,
        },
        {
          id: 4,
          title: "Subtask 4",
          completed: false,
        },
      ],
    },
  ],
};
