import { useMemo } from "react";
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
  }

  return (
    <div
      className="base_kanban_list__item"
      draggable
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
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
