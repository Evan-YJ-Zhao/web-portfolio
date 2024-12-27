import { motion } from "framer-motion";
import { useState } from "react";
import TimelineCheckMarkSVG from "./TimelineCheckMarkSVG";
import timelineExperience, { TimelineExperience } from "./TimelineData";

const detailListVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const detailListItemVariant = {
  hidden: {
    y: 10,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Timeline = () => {
  const [selectedExp, setSelectedExp] = useState<number>(
    timelineExperience[timelineExperience.length - 1].id
  );

  const expSummaryOnClickHandler = (id: number) => () => {
    setSelectedExp(id);
  };

  const isSelected = (id: number) => id == selectedExp;

  return (
    <div className="mt-12 mb-8 tablet:mx-5 desktop-sm:mx-20 flex justify-evenly">
      <div className="flex justify-start">
        <ul className="timeline timeline-vertical [--timeline-col-start:auto]">
          {timelineExperience.map((exp: TimelineExperience, index: number) => (
            <li
              key={`exp-summary-${exp.id}`}
              className="min-h-[6.2rem]"
              onClick={expSummaryOnClickHandler(exp.id)}
            >
              {index != 0 && <hr className="bg-primary" />}
              <div className="timeline-start min-w-20 text-end max-laptop:hidden">
                {exp.startDate}
              </div>
              <div
                data-theme={isSelected(exp.id) ? "cmyk" : "lofi"}
                className="timeline-middle text-primary"
              >
                <TimelineCheckMarkSVG />
              </div>
              <div
                data-theme={isSelected(exp.id) ? "cmyk" : "lofi"}
                className={`timeline-end timeline-box hover:cursor-pointer rounded-xl border-[1.5px] border-primary box-border 
                  ${isSelected(exp.id) ? "outline outline-primary" : ""}`}
              >
                <div className="text-lg font-black">{exp.title}</div>
                <div className="text-md italic">
                  {exp.organization}, Ended in {exp.endDate}
                </div>
              </div>
              <hr className="bg-primary" />
            </li>
          ))}
        </ul>
      </div>
      <div
        className="w-8/12 laptop:6/12 desktop-sm:w-5/12 h-96 
            desktop-sm:-ml-16 
            flex flex-col overflow-scroll overscroll-contain text-pretty"
      >
        {timelineExperience.map((exp: TimelineExperience) => (
          <div
            key={`exp-detail-${exp.id}`}
            className={`${isSelected(exp.id) ? "block" : "hidden"}`}
          >
            <motion.ul
              key={`exp-detail-list-${exp.id}`}
              className="px-5"
              variants={detailListVariant}
              initial="hidden"
              animate={isSelected(exp.id) ? "visible" : ""}
            >
              {exp.descriptions.map((description, index) => (
                <motion.li
                  key={`exp-detail-list-item-${exp.id}-${index}`}
                  className="my-2 text-lg border border-primary rounded-lg p-3"
                  variants={detailListItemVariant}
                >
                  {description}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
