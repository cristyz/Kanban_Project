export interface KanbanState {
  boards: KanbanBoard[];
  kanbanItens: KanbanItem[];
}

export interface KanbanBoard {
  id: number;
  title: string;
  // kanbanItens: KanbanItem[];
}

export interface KanbanItem {
  id: number;
  title: string;
  boardId: number;
  subtasks: KanbanSubtask[];
}

export interface KanbanSubtask {
  id: number;
  title: string;
  completed: boolean;
}
