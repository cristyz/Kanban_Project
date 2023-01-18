import { useAppSelector } from "../../store/hooks";
import { PartialKanbanList } from "./partials/PartialKanbanList";
import "./style.scss";

export function BaseKanban() {
  const kanbanStore = useAppSelector((state) => state.kanban);
  const boardsOfProjectSelected = kanbanStore.boards.filter(
    (b) => b.projectId === kanbanStore.projectSelectedId
  );

  return (
    <div id="base_kanban">
      {boardsOfProjectSelected.map((board) => (
        <PartialKanbanList key={board.id} board={board} />
      ))}
    </div>
  );
}
