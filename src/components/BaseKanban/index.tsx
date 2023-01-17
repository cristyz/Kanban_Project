import { useAppSelector } from "../../store/hooks";
import { PartialKanbanList } from "./partials/PartialKanbanList";
import "./style.scss";

export function BaseKanban() {
  const kanbanStore = useAppSelector((state) => state.kanban);

  return (
    <div id="base_kanban">
      {kanbanStore.boards.map((board) => (
        <PartialKanbanList key={board.id} board={board} />
      ))}
    </div>
  );
}
