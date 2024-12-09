import { OptionalClassName } from "@/utils/types";

type Props = OptionalClassName & {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// If needed in other pages, may move this to a common folder.
const FormTextLabelledInput = ({
  name,
  label,
  placeholder,
  value,
  error,
  onChangeHandler,
  className = ""
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
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className={`input input-bordered ${
          error ? "input-error" : "input-primary"
        } w-full ${className}`}
        required
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default FormTextLabelledInput;
