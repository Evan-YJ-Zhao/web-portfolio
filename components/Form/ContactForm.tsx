"use client";

import { useReducer } from "react";
import formReducer, { FormAction } from "@/reducers/formReducer";
import { FormState } from "@/reducers/formReducer";
import { StringValues } from "@/utils/commonTypes";
import isEmail from "validator/lib/isEmail";
import escape from "validator/lib/escape";
import trim from "validator/lib/trim";

// Allows only input with the following names
const formFields = [
  "firstName",
  "lastName",
  "email",
  "subject",
  "message",
] as const;
type FormFields = (typeof formFields)[number];

const isFormField = (name: string): name is FormFields => {
  return (formFields as readonly string[]).includes(name);
};

const initialState: FormState<FormFields> = {
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

const ContactForm = () => {
  const [formData, dispatchFormData] = useReducer(
    formReducer<FormFields>,
    initialState
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isFormField(e.target.name)) {
      dispatchFormData({
        type: FormAction.SET_FIELD,
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
          type: FormAction.SET_ERROR,
          field: field,
          payload: errors[field],
        });
      }
    }

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const sanitizedValues = getSanitizedFieldValues(formData.values);
      dispatchFormData({type: FormAction.RESET});
    }
  };

  return (
    <>
      <div className=" w-full max-w-xl border border-primary bg-neutral p-8">
        <h2 className="text-2xl tablet:text-4xl font-bold tablet:mb-6 text-start">
          Contact Me
        </h2>
        <form className="tablet:space-y-4" onSubmit={handleSubmit} noValidate>
          {/* First Name and Last Name */}
          <div className="flex flex-col tablet:flex-row tablet:gap-4">
            <div className="form-control w-full tablet:w-1/2">
              <label className="label">
                {formData.errors.firstName ? (
                  <span className="label-text text-error">
                    First Name {formData.errors.firstName}
                  </span>
                ) : (
                  <span className="label-text">First Name</span>
                )}
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className={`input input-bordered ${
                  formData.errors.firstName ? "input-error" : "input-primary"
                } w-full`}
                required
                value={formData.values.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full tablet:w-1/2">
              <label className="label">
                {formData.errors.lastName ? (
                  <span className="label-text text-error">
                    Last Name {formData.errors.lastName}
                  </span>
                ) : (
                  <span className="label-text">Last Name</span>
                )}
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={`input input-bordered ${
                  formData.errors.lastName ? "input-error" : "input-primary"
                } w-full`}
                required
                value={formData.values.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="form-control">
            <label className="label">
              {formData.errors.email ? (
                <span className="label-text text-error">
                  Email Address {formData.errors.email}
                </span>
              ) : (
                <span className="label-text">Email Address</span>
              )}
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              className={`input input-bordered ${
                formData.errors.email ? "input-error" : "input-primary"
              } w-full`}
              required
              value={formData.values.email}
              onChange={handleChange}
            />
          </div>

          {/* Subject */}
          <div className="form-control">
            <label className="label">
              {formData.errors.subject ? (
                <span className="label-text text-error">
                  Subject {formData.errors.subject}
                </span>
              ) : (
                <span className="label-text">Subject</span>
              )}
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className={`input input-bordered ${
                formData.errors.subject ? "input-error" : "input-primary"
              } w-full`}
              required
              value={formData.values.subject}
              onChange={handleChange}
            />
          </div>

          {/* Message */}
          <div className="form-control">
            <label className="label">
              {formData.errors.message ? (
                <span className="label-text text-error">
                  Message {formData.errors.message}
                </span>
              ) : (
                <span className="label-text">Message</span>
              )}
            </label>
            <textarea
              name="message"
              placeholder="Your message..."
              className={`textarea textarea-bordered ${
                formData.errors.message ? "textarea-error" : "textarea-primary"
              } w-full`}
              rows={6}
              required
              value={formData.values.message}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactForm;