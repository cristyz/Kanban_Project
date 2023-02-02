import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/hooks";
import { KanbanBoard } from "../../../store/kanban/interface";
import { removeBoard, updateBoard } from "../../../store/kanban/slice";

interface PartialKanbanListHeaderProps {
  board: KanbanBoard;
  tasksQtd: number;
}

export function PartialKanbanListHeader({
  board,
  tasksQtd,
}: PartialKanbanListHeaderProps) {
  const dispatch = useAppDispatch();

  function onBlurTitle(e: React.FocusEvent<HTMLHeadingElement, Element>) {
    dispatch(updateBoard({ ...board, title: e.target.innerText }));
  }

  return (
    <div className="base_kanban_list__header">
      <div className="base_kanban_list__header__point"></div>
      <span
        className="base_kanban_list__header__title"
        contentEditable
        suppressContentEditableWarning
        onBlur={onBlurTitle}
      >
        {board.title}
      </span>
      <span className="base_kanban_list__header__task_quantity">
        ({tasksQtd})
      </span>

      <div
        className="base_kanban_list__header__remove_button"
        onClick={() => dispatch(removeBoard(board))}
      >
        &#10006;
      </div>
    </div>
  );
}
