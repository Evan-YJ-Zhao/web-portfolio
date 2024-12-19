import { StringValues } from "@/utils/types";

enum FormValuesActionType {
  UPDATE_VALUE,
  SET_ERROR,
  RESET_VALUES,
}

type SetXAction<TField> = {
  type: FormValuesActionType.UPDATE_VALUE | FormValuesActionType.SET_ERROR;
  field: TField;
  payload: string;
};

type ResetAction = {
  type: FormValuesActionType.RESET_VALUES;
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
    case FormValuesActionType.UPDATE_VALUE:
      return {
        values: {
          ...state.values,
          [action.field]: action.payload,
        },
        errors: {
          ...state.errors,
          [action.field]: "", // also reset the error when field is updating. May change this logic later.
        },
      };
    case FormValuesActionType.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.payload,
        },
      };
    case FormValuesActionType.RESET_VALUES:
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
export { FormValuesActionType };
export type { State as FormValuesState, Action as FormValuesAction };
export default formValuesReducer;
