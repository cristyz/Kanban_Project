import { KanbanBoard, KanbanItem } from "../../../store/kanban/interface";
import { PartialKanbanListHeader } from "./PartialKanbanListHeader";
import { PartialKanbanListItem } from "./PartialKanbanListItem";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { moveKanbanItem } from "../../../store/kanban/slice";

interface PartialKanbanListProps {
  board: KanbanBoard;
}

export function PartialKanbanList({ board }: PartialKanbanListProps) {
  const kanbanStore = useAppSelector((state) => state.kanban);
  const dispatch = useAppDispatch();

  const kanbanBoardItens = kanbanStore.kanbanItens.filter(
    (item) => item.boardId === board.id
  );

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    const kanbanItemId = e.dataTransfer.getData("text/plain");
    const kanbanItem = kanbanStore.kanbanItens.find(
      (item) => item.id === Number(kanbanItemId)
    );

    if (!!kanbanItem) {
      dispatch(
        moveKanbanItem({
          ...kanbanItem,
          boardId: board.id,
        })
      );
    }
  }

  return (
    <div
      className="base_kanban_list"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <PartialKanbanListHeader
        title={board.title}
        tasksQtd={kanbanBoardItens.length}
      />
      {kanbanBoardItens.map((kanbanItem) => (
        <PartialKanbanListItem kanbanItem={kanbanItem} key={kanbanItem.id} />
      ))}
    </div>
  );
}
