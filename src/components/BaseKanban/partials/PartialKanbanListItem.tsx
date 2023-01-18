import { useMemo } from "react";
import { KanbanItem } from "../../../store/kanban/interface";

interface PartialKanbanListItemProps {
  kanbanItem: KanbanItem;
}

export function PartialKanbanListItem({
  kanbanItem,
}: PartialKanbanListItemProps) {
  const subtasksCompleted = useMemo(
    () => kanbanItem.subtasks.filter((subtask) => subtask.completed),
    [kanbanItem.subtasks]
  );

  function onDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData("text/plain", `${kanbanItem.id}`);
  }

  return (
    <div className="base_kanban_list__item" draggable onDragStart={onDragStart}>
      <strong className="base_kanban_list__item__title">
        {kanbanItem.title}
      </strong>
      <span className="base_kanban_list__item__subtasks">
        {subtasksCompleted.length} of {kanbanItem.subtasks.length} subtasks
      </span>
    </div>
  );
}
