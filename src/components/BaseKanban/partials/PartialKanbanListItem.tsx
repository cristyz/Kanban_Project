import { useState } from "react";
import { classNames as cn } from "../../../helpers/class-name";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { KanbanItem } from "../../../store/kanban/interface";
import {
  changeKanbanItemPositionInDifferentBoard,
  changeKanbanItemPositionInSameBoard,
  setKanbanItemIdToEdit,
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

  function handleSetKanbanItemIdToEdit() {
    dispatch(setKanbanItemIdToEdit(kanbanItem.id));
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
      onClick={handleSetKanbanItemIdToEdit}
    >
      <strong className="base_kanban_list__item__title">
        {kanbanItem.title}
      </strong>
      {kanbanItem.description && (
        <span className="base_kanban_list__item__description">
          {`${kanbanItem.description?.slice(0, 20)}...`}
        </span>
      )}
    </div>
  );
}
