import { classNames as cn } from "../../../helpers/class-name";
import { KanbanBoard, KanbanItem } from "../../../store/kanban/interface";
import { PartialKanbanListHeader } from "./PartialKanbanListHeader";
import { PartialKanbanListItem } from "./PartialKanbanListItem";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { moveKanbanItemToNewBoard } from "../../../store/kanban/slice";
import { useState } from "react";
import orderBy from "lodash.orderby";

interface PartialKanbanListProps {
  board: KanbanBoard;
}

export function PartialKanbanList({ board }: PartialKanbanListProps) {
  const kanbanStore = useAppSelector((state) => state.kanban);
  const dispatch = useAppDispatch();

  const [isDragEnter, setIsDragEnter] = useState(false);

  const kanbanBoardItens = orderBy(
    kanbanStore.kanbanItens.filter((item) => item.boardId === board.id),
    ["position"],
    ["asc"]
  );

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    const kanbanItemId = e.dataTransfer.getData("text/plain");
    const kanbanItem = kanbanStore.kanbanItens.find(
      (item) => item.id === Number(kanbanItemId)
    );

    if (!!kanbanItem) {
      dispatch(
        moveKanbanItemToNewBoard({
          ...kanbanItem,
          boardId: board.id,
        })
      );
    }

    setIsDragEnter(false);
  }

  return (
    <div
      className={cn("base_kanban_list", {
        base_kanban_list__drag_enter: isDragEnter,
      })}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsDragEnter(true)}
      onDragLeave={() => setIsDragEnter(false)}
    >
      <PartialKanbanListHeader
        board={board}
        tasksQtd={kanbanBoardItens.length}
      />
      {kanbanBoardItens.map((kanbanItem) => (
        <PartialKanbanListItem kanbanItem={kanbanItem} key={kanbanItem.id} />
      ))}
    </div>
  );
}
