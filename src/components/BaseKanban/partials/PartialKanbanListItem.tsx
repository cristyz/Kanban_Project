import { KanbanItem } from "../../../store/kanban/interface";

interface PartialKanbanListItemProps {
  kanbanItem: KanbanItem;
}

export function PartialKanbanListItem({
  kanbanItem,
}: PartialKanbanListItemProps) {
  const subtasksCompleted = kanbanItem.subtasks.filter(
    (subtask) => subtask.completed
  );

  return (
    <div className="base_kanban_list__item">
      <strong className="base_kanban_list__item__title">
        {kanbanItem.title}
      </strong>
      <span className="base_kanban_list__item__substasks">
        {subtasksCompleted.length} of {kanbanItem.subtasks.length} subtasks
      </span>
    </div>
  );
}
