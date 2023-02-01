import MDEditor from "@uiw/react-md-editor";
import { Controller } from "react-hook-form";

interface BaseMdEditorProps {
  id: string;
  label: string;
  control: any;
}

export function BaseMdEditor({ id, label, control }: BaseMdEditorProps) {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <div className="base_md_editor" data-color-mode="dark">
          <label htmlFor={id}>{label}</label>
          <MDEditor
            value={field.value}
            onChange={field.onChange}
            className="base_md_editor__editor"
          />
        </div>
      )}
    />
  );
}
