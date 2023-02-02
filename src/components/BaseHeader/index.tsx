import "./style.scss";
import { BaseButton } from "../BaseButton";
import { useState } from "react";
import { PartialAddNewTaskModal } from "./partials/PartialAddNewTaskModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateProject } from "../../store/kanban/slice";

export function BaseHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const kanbanStore = useAppSelector((state) => state.kanban);
  const dispatch = useAppDispatch();
  const projectSelectedTitle = kanbanStore.projects.find(
    (p) => p.id === kanbanStore.projectSelectedId
  )?.title;

  function updateProjectTitle(
    e: React.FocusEvent<HTMLHeadingElement, Element>
  ) {
    dispatch(
      updateProject({
        id: kanbanStore.projectSelectedId,
        title: e.target.innerText,
      })
    );
  }

  return (
    <div id="base_header">
      <h1
        suppressContentEditableWarning
        contentEditable
        onBlur={updateProjectTitle}
      >
        {projectSelectedTitle}
      </h1>
      <div>
        <BaseButton onClick={() => setIsOpen(true)}>+ Add New Task</BaseButton>
      </div>

      <PartialAddNewTaskModal
        title="New Task"
        isOpenState={[isOpen, setIsOpen]}
      />
    </div>
  );
}
