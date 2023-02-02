import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createNewBoard } from "../../store/kanban/slice";
import { BaseButton } from "../BaseButton";
import { PartialKanbanList } from "./partials/PartialKanbanList";
import "./style.scss";

export function BaseKanban() {
  const kanbanStore = useAppSelector((state) => state.kanban);
  const dispatch = useAppDispatch();

  const boardsOfProjectSelected = kanbanStore.boards.filter(
    (b) => b.projectId === kanbanStore.projectSelectedId
  );

  return (
    <div id="base_kanban">
      <div className="base_kanban__create_board_button">
        <BaseButton onClick={() => dispatch(createNewBoard())}>
          + Create Board
        </BaseButton>
      </div>
      <div className="base_kanban__body">
        {boardsOfProjectSelected.map((board) => (
          <PartialKanbanList key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
}
