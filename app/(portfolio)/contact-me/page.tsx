"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ContactForm from "@/components/Form/ContactForm";
import { mailImg } from "@/utils/images";

const page = () => {
  const [contactFormIsSubmitted, setContactFormIsSubmitted] =
    useState<boolean>(false);

  const messageButtonClickHandler = () => {
    // reset contact form
    setContactFormIsSubmitted(false);
  };

  return (
    <div className="h-full bg-neutral flex flex-col justify-center items-center">
      <AnimatePresence mode="wait">
        {contactFormIsSubmitted ? (
          <div
            key="contact-confirmation"
            className="h-full pt-32 text-center space-y-3"
          >
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
            >
              <p className="text-lg">
                Thank you for reaching out! I have received your message and
                will respond ASAP.
              </p>
              <p className="text-sm">
                If you would <em>(for any reasons)</em> like to submit another
                message, click the button to submit another message
              </p>
            </motion.div>

            <motion.button
              data-theme="cmyk"
              className="relative btn btn-circle btn-ghost hover:bg-info w-14 h-14"
              onClick={messageButtonClickHandler}
              initial={{ opacity: 0, x: -500, border: "2px solid transparent" }}
              animate={{
                opacity: 1,
                x: 0,
                border: [
                  "2px solid transparent",
                  "2px solid #FAFAFA",
                  "2px solid #333333",
                  "2px solid #FAFAFA",
                  "2px solid transparent",
                ],
                transition: {
                  opacity: {
                    delay: 2,
                  },
                  x: {
                    duration: 0.1,
                    delay: 2,
                  },
                  border: {
                    duration: 1.5,
                    delay: 2.1,
                  },
                },
              }}
              exit={{ opacity: 0, x: 500 }}
              whileTap={{
                scale: 0.8,
              }}
            >
              <Image
                src={mailImg}
                alt="Contact Form Image"
                width={35}
                height={35}
              />
            </motion.button>
          </div>
        ) : (
          <ContactForm
            key="contact-form"
            onFormSubmitted={setContactFormIsSubmitted}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default page;
