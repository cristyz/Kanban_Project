import "./style.scss";
import { BaseButton } from "../BaseButton";
import { useState } from "react";
import { PartialAddNewTaskModal } from "./partials/PartialAddNewTaskModal";
import { useAppSelector } from "../../store/hooks";

export function BaseHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const kanbanStore = useAppSelector((state) => state.kanban);
  const projectSelectedTitle = kanbanStore.projects.find(
    (p) => p.id === kanbanStore.projectSelectedId
  )?.title;

  return (
    <div id="base_header">
      <h1>{projectSelectedTitle}</h1>
      <div>
        <BaseButton onClick={() => setIsOpen(true)}>+Add New Task</BaseButton>
      </div>

      <PartialAddNewTaskModal
        title="New Task"
        isOpenState={[isOpen, setIsOpen]}
      />
    </div>
  );
}
