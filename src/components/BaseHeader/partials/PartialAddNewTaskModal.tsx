import { BaseInput } from "../../FormComponents/BaseInput";
import { BaseModal, BaseModalProps } from "../../BaseModal";
import { useForm, Controller } from "react-hook-form";
import { BaseButton } from "../../BaseButton";
import {
  BaseSelect,
  BaseSelectOptions,
} from "../../FormComponents/BaseSelect/BaseSelect";
import { addTask, selectOptions } from "../../../store/kanban/slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export function PartialAddNewTaskModal({ title, isOpenState }: BaseModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state);
  const [_, setIsOpen] = isOpenState;

  const onSubmit = (data: any) => {
    const boardId = store.kanban.boards.find(
      (board) => board.id == data.status?.value
    )?.id;
    if (!boardId) return console.error("Board not found");

    dispatch(
      addTask({
        boardId: boardId,
        id: Math.floor(Math.random() * 1000),
        subtasks: [],
        title: data.title,
      })
    );

    setIsOpen(false);
    reset();
  };

  return (
    <BaseModal title={title} isOpenState={isOpenState}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput id="title" label="Title" register={register} />
        <BaseSelect
          id="status"
          label="Status"
          options={selectOptions(store)}
          control={control}
        />
        <BaseButton>Create Task</BaseButton>
      </form>
    </BaseModal>
  );
}
