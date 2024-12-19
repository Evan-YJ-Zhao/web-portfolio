import formValuesReducer, {
  FormValuesActionType,
  FormValuesState,
  FormValuesAction,
} from "@/reducers/formValuesReducer";

type testFields = "test1" | "test2" | "test3";

describe("formValuesReducer", () => {
  it("should update only the value and error for one field", () => {
    const state: FormValuesState<testFields> = {
      values: {
        test1: "test1 value",
        test2: "",
        test3: "",
      },
      errors: {},
    };

    const action: FormValuesAction<testFields> = {
      type: FormValuesActionType.UPDATE_VALUE,
      field: "test2",
      payload: "test2 value",
    };

    const expectedResult: FormValuesState<testFields> = {
      values: {
        test1: "test1 value",
        test2: "test2 value",
        test3: "",
      },
      errors: {
        test2: "", // yea, this is expected
      },
    };

    const resultState: FormValuesState<testFields> = formValuesReducer(
      state,
      action
    );

    expect(resultState).toEqual(expectedResult);
  });

  it("should set only one error for a field", () => {
    const state: FormValuesState<testFields> = {
      values: {
        test1: "test1 value",
        test2: "test2",
        test3: "",
      },
      errors: {},
    };

    const action: FormValuesAction<testFields> = {
      type: FormValuesActionType.SET_ERROR,
      field: "test2",
      payload: "test2 error",
    };

    const expectedResult: FormValuesState<testFields> = {
      values: {
        test1: "test1 value",
        test2: "test2",
        test3: "",
      },
      errors: {
        test2: "test2 error",
      },
    };

    const resultState: FormValuesState<testFields> = formValuesReducer(
      state,
      action
    );

    expect(resultState).toEqual(expectedResult);
  });

  it("should reset all values to an empty string and remove all errors", () => {
    const state: FormValuesState<testFields> = {
      values: {
        test1: "test1 value",
        test2: "test2",
        test3: "",
      },
      errors: {
        test2: "test2 errors",
      },
    };

    const action: FormValuesAction<testFields> = {
      type: FormValuesActionType.RESET_VALUES,
    };

    const expectedResult: FormValuesState<testFields> = {
      values: {
        test1: "",
        test2: "",
        test3: "",
      },
      errors: {},
    };

    const resultState: FormValuesState<testFields> = formValuesReducer(
      state,
      action
    );

    expect(resultState).toEqual(expectedResult);
  });

  it("should return the input state if given no action type", () => {
    const state: FormValuesState<testFields> = {
      values: {
        test1: "test1 value",
        test2: "test2",
        test3: "",
      },
      errors: {
        test2: "test2 errors",
      },
    };

    const action = {};

    const resultState: FormValuesState<testFields> = formValuesReducer(
      state,
      action as FormValuesAction<testFields>
    );

    expect(resultState).toEqual(state);
  });
});
