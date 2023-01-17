export interface KanbanState {
  boards: KanbanBoard[];
}

export interface KanbanBoard {
  id: number;
  title: string;
  kanbanItens: KanbanItem[];
}

export interface KanbanItem {
  id: number;
  title: string;
  subtasks: KanbanSubtask[];
}

export interface KanbanSubtask {
  id: number;
  title: string;
  completed: boolean;
}
