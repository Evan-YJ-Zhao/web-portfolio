import { useState } from "react";
import TimelineCheckMarkSVG from "./TimelineCheckMarkSVG";
import timelineExperience, { TimelineExperience } from "./TimelineData";


const TimelineMobile = () => {
  const [selectedExp, setSelectedExp] = useState<number>(
    timelineExperience[timelineExperience.length - 1].id
  );

  const expSummaryClickHandler = (id: number) => () => {
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
              onClick={expSummaryClickHandler(exp.id)}
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
      
    </div>
  );
};

export default TimelineMobile;
