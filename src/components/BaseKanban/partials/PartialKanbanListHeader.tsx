interface PartialKanbanListHeaderProps {
  title: string;
  tasksQtd: number;
}

export function PartialKanbanListHeader({
  title,
  tasksQtd,
}: PartialKanbanListHeaderProps) {
  return (
    <div className="base_kanban_list__header">
      <div className="base_kanban_list__header__point"></div>
      <span className="base_kanban_list__header__title">
        {title} ({tasksQtd})
      </span>
    </div>
  );
}
