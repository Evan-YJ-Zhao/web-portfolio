import { StringValues } from "@/utils/types";

enum FormAction {
  SET_FIELD,
  SET_ERROR,
  RESET,
}

type SetXAction<T> = {
  type: FormAction.SET_FIELD | FormAction.SET_ERROR;
  field: T;
  payload: string;
};

type ResetAction = {
  type: FormAction.RESET;
};

type Action<T extends string> = SetXAction<T> | ResetAction;

type State<T extends string> = {
  values: StringValues<T>;
  errors: Partial<StringValues<T>>;
};

const formReducer = <T extends string>(
  state: State<T>,
  action: Action<T>
): State<T> => {
  switch (action.type) {
    case FormAction.SET_FIELD:
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
    case FormAction.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.payload,
        },
      };
    case FormAction.RESET:
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
export { FormAction };
export type { State as FormState };
export default formReducer;
