import { KanbanState } from "./interface";

export const initialKanbanState: KanbanState = {
  boards: [
    {
      id: 1,
      title: "Todo",
      kanbanItens: [
        {
          id: 1,
          title: "Build Ui for onboarding flow Build",
          subtasks: [
            {
              id: 1,
              title: "Subtask 1",
              completed: false,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Done",
      kanbanItens: [
        {
          id: 2,
          title: "Check if the user is logged",
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
    },
  ],
};
