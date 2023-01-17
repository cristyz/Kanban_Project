import { KanbanBoard } from "../../../store/kanban/interface";
import { PartialKanbanListHeader } from "./PartialKanbanListHeader";
import { PartialKanbanListItem } from "./PartialKanbanListItem";

interface PartialKanbanListProps {
  board: KanbanBoard;
}

export function PartialKanbanList({ board }: PartialKanbanListProps) {
  return (
    <div className="base_kanban_list">
      <PartialKanbanListHeader
        title={board.title}
        tasksQtd={board.kanbanItens.length}
      />
      {board.kanbanItens.map((kanbanItem) => (
        <PartialKanbanListItem kanbanItem={kanbanItem} key={kanbanItem.id} />
      ))}
    </div>
  );
}
