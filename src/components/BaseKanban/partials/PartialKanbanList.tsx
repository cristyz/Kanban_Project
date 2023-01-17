import { PartialKanbanListHeader } from "./PartialKanbanListHeader";
import { PartialKanbanListItem } from "./PartialKanbanListItem";

export function PartialKanbanList() {
  return (
    <div className="base_kanban_list">
      <PartialKanbanListHeader />
      <PartialKanbanListItem />
    </div>
  );
}
