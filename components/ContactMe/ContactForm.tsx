"use client";

import { motion } from "framer-motion";
import { useEffect, useReducer, useState } from "react";
import isEmail from "validator/lib/isEmail";
import escape from "validator/lib/escape";
import trim from "validator/lib/trim";
import {
  contactFields,
  ContactFields,
  createContact,
  getHealth,
} from "@/api/contactApi";
import formValuesReducer, {
  FormValuesActionType,
  FormValuesState,
} from "@/reducers/formValuesReducer";
import { StringValues } from "@/utils/types";
import LINKS from "@/utils/links";
import FormTextLabelledInput from "./Input/FormTextLabelledInput";
import FormLabelledTextArea from "./Input/FormLabelledTextArea";
import { ApiResponse } from "@/api/types";

// loosen the coupling a bit with the contact api, ensuring extensibility
type FormFields = ContactFields;
const formFields = [...contactFields] as const;

const isFormField = (name: string): name is FormFields => {
  return (formFields as readonly string[]).includes(name);
};

const initialState: FormValuesState<FormFields> = {
  values: {
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  },
  errors: {},
};

// simple form constraint
const fieldsMaxChars: Record<FormFields, number> = Object.freeze({
  firstName: 20,
  lastName: 20,
  email: 50,
  subject: 300,
  message: 5000,
});

const getSanitizedFieldValues = (
  formDataValues: StringValues<FormFields>
): StringValues<FormFields> => {
  return formFields.reduce(
    (acc, field) => ({ ...acc, [field]: escape(trim(formDataValues[field])) }),
    formDataValues
  );
};

enum Status {
  INIT,
  SUBMITTING,
  SUBMITTED,
  UNAVAILABLE,
}

const ContactForm = ({
  onFormSubmitted,
}: {
  onFormSubmitted: (value: boolean) => void;
}) => {
  const [status, setStatus] = useState<Status>(Status.INIT);
  const [formData, dispatchFormData] = useReducer(
    formValuesReducer<FormFields>,
    initialState
  );

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isFormField(e.target.name)) {
      dispatchFormData({
        type: FormValuesActionType.UPDATE_VALUE,
        field: e.target.name,
        payload: e.target.value,
      });
    }
  };

  // Return a boolean:
  // false: form is not valid, dispatch errors
  // true: form is valid.
  const validateForm = (): boolean => {
    const { values: formDataValues } = formData;
    const errors: Partial<StringValues<FormFields>> = {};

    for (const field of formFields) {
      const fieldVal = formDataValues[field];
      const maxChars = fieldsMaxChars[field];

      // validate the value string length
      const fieldValTrimmed = trim(fieldVal);
      if (fieldValTrimmed.length > maxChars) {
        errors[field] = `has a limit of ${maxChars} characters`;
      } else if (fieldValTrimmed.length <= 0) {
        errors[field] = "is required";
      }
    }

    // validate email
    const emailVal = formDataValues["email"];
    if (!isEmail(emailVal)) {
      errors["email"] = "is not valid";
    }

    // dispatch altogether
    for (const field of formFields) {
      if (errors[field]) {
        dispatchFormData({
          type: FormValuesActionType.SET_ERROR,
          field: field,
          payload: errors[field],
        });
      }
    }

    return Object.keys(errors).length === 0;
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setStatus(Status.SUBMITTING);

      const sanitizedValues = getSanitizedFieldValues(formData.values);
      const result = await createContact(sanitizedValues);

      if (result.success) {
        setStatus(Status.SUBMITTED);
        onFormSubmitted(true);
      } else {
        setStatus(Status.UNAVAILABLE);
        onFormSubmitted(false);
      }

      // Cleans up the values when the user clicks submit.
      dispatchFormData({ type: FormValuesActionType.RESET_VALUES });
    }
  };

  //
  useEffect(() => {
    let ignore = false;
    getHealth().then((res: ApiResponse) => {
      if (!ignore && !res.success) {
        setStatus(Status.UNAVAILABLE);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {status === Status.UNAVAILABLE && (
        <div className="mb-5 text-center">
          <p className="text-lg text-error">
            {/* An error occurred, and the form is currently unavailable. Please */}
            The contact form is being built and is currently unavailable. Please
            connect via{" "}
            <a
              href={LINKS.LINKEDIN_PROFILE}
              target="_blank"
              className="underline font-bold"
            >
              LinkedIn
            </a>{" "}
            instead.
          </p>
        </div>
      )}

      <motion.div
        className="w-full max-w-xl border border-primary bg-neutral p-8"
        initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        <h2 className="text-2xl tablet:text-4xl font-bold tablet:mb-6 text-start">
          Contact Me
        </h2>
        <form
          className="tablet:space-y-4"
          onSubmit={onSubmitHandler}
          noValidate
        >
          {/* First Name and Last Name */}
          <div className="flex flex-col tablet:flex-row tablet:gap-4">
            <div className="form-control w-full tablet:w-1/2">
              <FormTextLabelledInput
                name="firstName"
                label="First Name"
                placeholder="First Name"
                value={formData.values.firstName}
                error={formData.errors.firstName}
                onChangeHandler={onChangeHandler}
                disabled={status === Status.UNAVAILABLE}
              />
            </div>
            <div className="form-control w-full tablet:w-1/2">
              <FormTextLabelledInput
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                value={formData.values.lastName}
                error={formData.errors.lastName}
                onChangeHandler={onChangeHandler}
                disabled={status === Status.UNAVAILABLE}
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="form-control">
            <FormTextLabelledInput
              name="email"
              label="Email Address"
              placeholder="example@email.com"
              value={formData.values.email}
              error={formData.errors.email}
              onChangeHandler={onChangeHandler}
              disabled={status === Status.UNAVAILABLE}
            />
          </div>

          {/* Subject */}
          <div className="form-control">
            <FormTextLabelledInput
              name="subject"
              label="Subject"
              placeholder="Subject"
              value={formData.values.subject}
              error={formData.errors.subject}
              onChangeHandler={onChangeHandler}
              disabled={status === Status.UNAVAILABLE}
            />
          </div>

          {/* Message */}
          <div className="form-control">
            <FormLabelledTextArea
              name="message"
              label="Message"
              placeholder="Your message..."
              value={formData.values.message}
              error={formData.errors.message}
              onChangeHandler={onChangeHandler}
              disabled={status === Status.UNAVAILABLE}
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={status === Status.UNAVAILABLE}
            >
              {status == Status.SUBMITTING ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default ContactForm;
