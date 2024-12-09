"use client";

import { motion } from "framer-motion";
import { useReducer, useState } from "react";
import isEmail from "validator/lib/isEmail";
import escape from "validator/lib/escape";
import trim from "validator/lib/trim";
import { contactFields, ContactFields, createContact } from "@/api/contact";
import formValuesReducer, { FormValuesAction, FormValuesState } from "@/reducers/formValuesReducer";
import { StringValues } from "@/utils/types";
import { LINKS } from "@/utils/links";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isFormField(e.target.name)) {
      dispatchFormData({
        type: FormValuesAction.UPDATE_VALUE,
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
          type: FormValuesAction.SET_ERROR,
          field: field,
          payload: errors[field],
        });
      }
    }

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setStatus(Status.SUBMITTING);

      const sanitizedValues = getSanitizedFieldValues(formData.values);
      const result = await createContact(sanitizedValues);

      dispatchFormData({ type: FormValuesAction.RESET_VALUES });

      setStatus(Status.SUBMITTED);
      onFormSubmitted(true);
    }
  };

  return (
    <>
      <div className="mb-5 text-center">
        <p className="text-lg text-error">
          {/* An error occurred, and the form is currently unavailable. Please */}
          The contact form is being built and is currently unavailable. 
          Please connect via{" "}
          <a href={LINKS.LINKEDIN_PROFILE} target="_blank" className="underline font-bold">
            LinkedIn
          </a>{" "}
          instead.
        </p>
      </div>
      <motion.div
        className="w-full max-w-xl border border-primary bg-neutral p-8"
        initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
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
