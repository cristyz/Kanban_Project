import { Controller } from "react-hook-form";
import Select from "react-select";

interface BaseSelectProps {
  id: string;
  label: string;
  options?: BaseSelectOptions[];
  control: any;
}
export interface BaseSelectOptions {
  value: string;
  label: string;
}

export function BaseSelect({ id, label, options, control }: BaseSelectProps) {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <div className="base_select">
          <label htmlFor={id}>{label}</label>
          <Select
            value={field.value}
            options={options}
            onChange={field.onChange}
            className="base_select__select"
            classNamePrefix="react_select"
          />
        </div>
      )}
    />
  );
}
