import { StringValues } from "@/utils/types";

enum FormValuesAction {
  UPDATE_VALUE,
  SET_ERROR,
  RESET_VALUES,
}

type SetXAction<TField> = {
  type: FormValuesAction.UPDATE_VALUE | FormValuesAction.SET_ERROR;
  field: TField;
  payload: string;
};

type ResetAction = {
  type: FormValuesAction.RESET_VALUES;
};

type Action<TFields extends string> = SetXAction<TFields> | ResetAction;

type State<TFields extends string> = {
  values: StringValues<TFields>;
  errors: Partial<StringValues<TFields>>;
};

const formValuesReducer = <TFields extends string>(
  state: State<TFields>,
  action: Action<TFields>
): State<TFields> => {
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
