export interface KanbanState {
  projectSelectedId: number;
  projects: KanbanProject[];
  boards: KanbanBoard[];
  kanbanItens: KanbanItem[];
}

export interface KanbanProject {
  id: number;
  title: string;
}

export interface KanbanBoard {
  id: number;
  title: string;
  projectId: number;
}

export interface KanbanItem {
  id: number;
  title: string;
  boardId: number;
  position: number;
  subtasks: KanbanSubtask[];
}

export interface KanbanSubtask {
  id: number;
  title: string;
  completed: boolean;
}
