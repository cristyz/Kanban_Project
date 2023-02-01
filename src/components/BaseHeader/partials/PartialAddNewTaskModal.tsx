import { BaseInput } from "../../FormComponents/BaseInput";
import { BaseModal, BaseModalProps } from "../../BaseModal";
import { useForm, Controller } from "react-hook-form";
import { BaseButton } from "../../BaseButton";
import {
  BaseSelect,
  BaseSelectOptions,
} from "../../FormComponents/BaseSelect/BaseSelect";
import {
  addTask,
  selectOptions,
  setKanbanItemIdToEdit,
  updateTask,
} from "../../../store/kanban/slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import MDEditor from "@uiw/react-md-editor";
import { BaseMdEditor } from "../../FormComponents/BaseMdEditor";
import { useEffect, useState } from "react";

export function PartialAddNewTaskModal({ title, isOpenState }: BaseModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state);
  const [isOpen, setIsOpen] = isOpenState;
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (store.kanban.setKanbanItemIdToEdit) {
      setIsOpen(true);
      setIsEditing(true);
      populateForm();
    }
  }, [store.kanban.setKanbanItemIdToEdit]);

  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
      dispatch(setKanbanItemIdToEdit(null));
      reset();
    }
  }, [isOpen]);

  const onSubmit = (data: any) => {
    if (!isEditing) return handleAddTask(data);
    return handleUpdateTask(data);
  };

  function handleAddTask(data: any) {
    const boardId = store.kanban.boards.find(
      (board) => board.id == data.status?.value
    )?.id;

    const itensInBoard = store.kanban.kanbanItens.filter(
      (task) => task.boardId == boardId
    );
    const lastPosition =
      (itensInBoard[itensInBoard.length - 1]?.position ?? 0) + 1;

    if (!boardId) return console.error("Board not found");

    dispatch(
      addTask({
        boardId: boardId,
        id: Math.floor(Math.random() * 999999),
        title: data.title,
        description: data.description,
        position: lastPosition,
      })
    );

    setIsOpen(false);
    reset();
  }

  function handleUpdateTask(data: any) {
    const boardId = store.kanban.boards.find(
      (board) => board.id == data.status?.value
    )?.id;
    console.log(boardId);

    if (!boardId) return console.error("Board not found");
    if (!store.kanban.setKanbanItemIdToEdit)
      return console.error("Task not found");

    const kanbanItem = store.kanban.kanbanItens.find(
      (task) => task.id == store.kanban.setKanbanItemIdToEdit
    );

    if (!kanbanItem) return console.error("Task not found");

    dispatch(
      updateTask({
        ...kanbanItem,
        description: data.description,
        title: data.title,
        boardId: boardId,
      })
    );

    setIsOpen(false);
    reset();
  }

  function populateForm() {
    const task = store.kanban.kanbanItens.find(
      (task) => task.id == store.kanban.setKanbanItemIdToEdit
    );

    if (!task) return console.error("Task not found");

    setValue("title", task.title);
    setValue("description", task.description);
    setValue("status", {
      value: task.boardId,
      label: store.kanban.boards.find((board) => board.id == task.boardId)
        ?.title,
    });
  }

  return (
    <BaseModal
      title={!isEditing ? "New Task" : "Edit Task"}
      isOpenState={isOpenState}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput id="title" label="Title" register={register} />
        <BaseMdEditor id="description" label="Description" control={control} />
        <BaseSelect
          id="status"
          label="Status"
          options={selectOptions(store)}
          control={control}
        />
        <BaseButton>{!isEditing ? "Create Task" : "Update Task"}</BaseButton>
      </form>
    </BaseModal>
  );
}
