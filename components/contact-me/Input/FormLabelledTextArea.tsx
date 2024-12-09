import { OptionalClassName } from "@/utils/types";

type Props = OptionalClassName & {
  name: string;
  label: string;
  placeholder: string;
  rows?: number;
  value: string;
  error?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const FormLabelledTextArea = ({
  name,
  label,
  placeholder,
  rows = 6,
  value,
  error,
  onChangeHandler,
  className = "",
}: Props) => {
  return (
    <div className="form-control">
      <label className="label">
        {error ? (
          <span className="label-text text-error">
            {label} {error}
          </span>
        ) : (
          <span className="label-text">{label}</span>
        )}
      </label>
      <textarea
        name={name}
        placeholder={placeholder}
        className={`textarea textarea-bordered ${
          error ? "textarea-error" : "textarea-primary"
        } w-full ${className}`}
        rows={rows}
        required
        value={value}
        onChange={onChangeHandler}
      ></textarea>
    </div>
  );
};

export default FormLabelledTextArea;
