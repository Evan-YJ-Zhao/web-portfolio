"use client";
import Image from "next/image";
import { useState } from "react";
import ContactForm from "@/components/Form/ContactForm";
import { mailImg } from "@/utils/images";

const page = () => {
  
  const [contactFormIsSubmitted, setContactFormIsSubmitted] = useState<boolean>(true);

  return (
    <div className="h-full bg-neutral flex justify-center items-center">
      {contactFormIsSubmitted ? (
        <div className="h-full pt-32 text-center space-y-3">
          <p className="text-lg">Thank you for reaching out! I have received your message and will respond ASAP.</p>
          <p className="text-sm">If you would <em>(for any reasons)</em> like to submit another message, click here to submit another message</p>
          <button className="relative btn btn-circle w-14 h-14">
            <Image src={mailImg} alt="Contact Form Image" width={35} height={35}/>
          </button>
        </div>
      ) : (
        <ContactForm onFormSubmitted={setContactFormIsSubmitted}/>
      )}
    </div>
  );
};

export default page;
