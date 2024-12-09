import { StringValues } from "@/utils/types";

enum FormValuesAction {
  UPDATE_VALUE,
  SET_ERROR,
  RESET_VALUES,
}

type SetXAction<T> = {
  type: FormValuesAction.UPDATE_VALUE | FormValuesAction.SET_ERROR;
  field: T;
  payload: string;
};

type ResetAction = {
  type: FormValuesAction.RESET_VALUES;
};

type Action<T extends string> = SetXAction<T> | ResetAction;

type State<T extends string> = {
  values: StringValues<T>;
  errors: Partial<StringValues<T>>;
};

const formValuesReducer = <T extends string>(
  state: State<T>,
  action: Action<T>
): State<T> => {
  switch (action.type) {
    case FormValuesAction.UPDATE_VALUE:
      return {
        values: {
          ...state.values,
          [action.field]: action.payload,
        },
        errors: {
          ...state.errors,
          [action.field]: "",
        },
      };
    case FormValuesAction.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.payload,
        },
      };
    case FormValuesAction.RESET_VALUES:
      return {
        values: Object.keys(state.values).reduce(
          (acc, key) => ({ ...acc, [key]: "" }),
          state.values
        ),
        errors: {},
      };
    default:
      return state;
  }
};
export { FormValuesAction };
export type { State as FormValuesState };
export default formValuesReducer;
