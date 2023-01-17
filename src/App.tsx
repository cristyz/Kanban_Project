import { useState } from "react";
import { BaseHeader } from "./components/BaseHeader";
import { BaseKanban } from "./components/BaseKanban";
import { BaseSidebar } from "./components/BaseSidebar";
import { useAppDispatch, useAppSelector } from "./store/hooks";
// import { addTask } from "./store/task/slice";

function App() {
  const taskStore = useAppSelector((state) => state.kanban);
  const dispatch = useAppDispatch();

  const [task, setTask] = useState("");
  const onInputTask = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTask(event.target.value);

  const onAddTask = () => {
    // dispatch(addTask(task));
    setTask("");
  };

  return (
    <main id="main">
      <BaseSidebar />
      <div id="main_content">
        <BaseHeader />
        <BaseKanban />
      </div>
    </main>
  );
}

export default App;
