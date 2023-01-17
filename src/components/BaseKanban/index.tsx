import { PartialKanbanList } from "./partials/PartialKanbanList";
import "./style.scss";

export function BaseKanban() {
  return (
    <div id="base_kanban">
        <PartialKanbanList />
    </div>
  );
}
