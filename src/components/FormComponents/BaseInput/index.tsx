import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";

interface BaseInputProps {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  register: UseFormRegister<any>;
}

export function BaseInput({
  id,
  label,
  type = "text",
  register,
}: BaseInputProps) {
  return (
    <div className="base_input">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} {...register(id)} />
    </div>
  );
}
