import { OptionalClassName } from "@/utils/types";

type Props = OptionalClassName & {
  name: string;
  label: string;
  placeholder: string;
  rows?: number;
  value: string;
  disabled?: boolean;
  error?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const FormLabelledTextArea = ({
  name,
  label,
  placeholder,
  value,
  error,
  onChangeHandler,
  rows = 6,
  disabled = false,
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
        disabled={disabled}
        value={value}
        onChange={onChangeHandler}
      ></textarea>
    </div>
  );
};

export default FormLabelledTextArea;
