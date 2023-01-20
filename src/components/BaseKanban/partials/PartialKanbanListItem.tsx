import { useMemo, useState } from "react";
import { classNames as cn } from "../../../helpers/class-name";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { KanbanItem } from "../../../store/kanban/interface";
import {
  changeKanbanItemPositionInDifferentBoard,
  changeKanbanItemPositionInSameBoard,
} from "../../../store/kanban/slice";

interface PartialKanbanListItemProps {
  kanbanItem: KanbanItem;
}

export function PartialKanbanListItem({
  kanbanItem,
}: PartialKanbanListItemProps) {
  const kanbanStore = useAppSelector((state) => state.kanban);
  const dispatch = useAppDispatch();

  const [isDragEnter, setIsDragEnter] = useState(false);

  const subtasksCompleted = useMemo(
    () => kanbanItem.subtasks.filter((subtask) => subtask.completed),
    [kanbanItem.subtasks]
  );

  function onDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData("text/plain", `${kanbanItem.id}`);
  }
  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    const id = e.dataTransfer.getData("text/plain");
    const item = kanbanStore.kanbanItens.find((item) => item.id === Number(id));
    const isSameBoard = item?.boardId === kanbanItem.boardId;

    if (!isSameBoard && item) {
      dispatch(
        changeKanbanItemPositionInDifferentBoard({
          ...item,
          position: kanbanItem.position,
          boardId: kanbanItem.boardId,
        })
      );
    }

    if (isSameBoard && item) {
      dispatch(
        changeKanbanItemPositionInSameBoard({
          ...item,
          position: kanbanItem.position,
        })
      );
    }

    setIsDragEnter(false);
  }

  return (
    <div
      className={cn("base_kanban_list__item", {
        base_kanban_list__item__drag_enter: isDragEnter,
      })}
      draggable
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsDragEnter(true)}
      onDragLeave={() => setIsDragEnter(false)}
    >
      <strong className="base_kanban_list__item__title">
        {kanbanItem.title}
      </strong>
      <span className="base_kanban_list__item__subtasks">
        {subtasksCompleted.length} of {kanbanItem.subtasks.length} subtasks
      </span>
    </div>
  );
}
