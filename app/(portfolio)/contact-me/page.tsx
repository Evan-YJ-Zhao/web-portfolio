"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ContactForm from "@/components/contact-me/ContactForm";
import MailContactButton from "@/components/contact-me/MotionButtons/MailContactButton";
import { linkedInColoredImg } from "@/utils/images";
import { LINKS } from "@/utils/links";

const page = () => {
  const [contactFormIsSubmitted, setContactFormIsSubmitted] =
    useState<boolean>(true);

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
                If you would like to submit another
                message, click the <b>mail-icon button</b> to submit another message
              </p>
            </motion.div>
            <motion.a
              data-theme="cmyk"
              href={LINKS.LINKEDIN_PROFILE}
              target="_blank"
              className="w-14 h-14 p-2 btn btn-circle btn-ghost hover:bg-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.8 } }}
            >
              <Image
                src={linkedInColoredImg}
                alt="LinkedIn Image"
                width={35}
                height={35}
              />
            </motion.a>

            <MailContactButton className="w-14 h-14" clickHandler={messageButtonClickHandler}/>
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
