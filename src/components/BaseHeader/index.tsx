import "./style.scss";
import { BaseButton } from "../BaseButton";

export function BaseHeader() {
  return (
    <div id="base_header">
      <h1>Project Selected</h1>
      <BaseButton onClick={() => console.log("Add new task")}>
        +Add New Task
      </BaseButton>
    </div>
  );
}
