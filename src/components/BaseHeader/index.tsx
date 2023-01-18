import "./style.scss";
import { BaseButton } from "../BaseButton";
import { BaseModal } from "../BaseModal";
import { useState } from "react";
import { PartialAddNewTaskModal } from "./partials/PartialAddNewTaskModal";

export function BaseHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="base_header">
      <h1>Project Selected</h1>
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
