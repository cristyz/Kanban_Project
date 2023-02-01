export interface KanbanState {
  projectSelectedId: number;
  setKanbanItemIdToEdit: number | null;
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
  description?: string;
  boardId: number;
  position: number;
}
