import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { addTask } from "./store/task/slice";

function App() {
  const taskStore = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const [task, setTask] = useState("");
  const onInputTask = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTask(event.target.value);

  const onAddTask = () => {
    dispatch(addTask(task));
    setTask("");
  };

  return (
    <div>
      <input type="text" value={task} onInput={onInputTask} />
      <button onClick={onAddTask}>add</button>
      {taskStore.tasks.map((task) => (
        <div key={task}>{task}</div>
      ))}
    </div>
  );
}

export default App;
