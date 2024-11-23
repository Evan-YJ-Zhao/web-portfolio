import { useState } from "react";
import TimelineCheckMarkSVG from "./TimelineCheckMarkSVG";
import timelineExperience, { TimelineExperience } from "./TimelineData";

const Timeline = () => {
  const [selectedExp, setSelectedExp] = useState<number>(
    timelineExperience[timelineExperience.length - 1].id
  );

  const expSummaryClickHandler = (id: number) => () => {
    setSelectedExp(id);
  };

  return (
    <div className="mt-12 mb-8 flex justify-evenly">
      <div className="ml-20 flex justify-start">
        <ul className="timeline timeline-vertical [--timeline-col-start:auto]">
          {timelineExperience.map((exp: TimelineExperience, index: number) => (
            <li
              key={`exp-summary-${exp.id}`}
              className="min-h-24"
              onClick={expSummaryClickHandler(exp.id)}
            >
              {index != 0 && <hr className="bg-primary" />}
              <div className="timeline-start min-w-20 text-end">
                {exp.startDate}
              </div>
              <div
                data-theme={exp.id == selectedExp ? "cmyk" : "lofi"}
                className="timeline-middle text-primary"
              >
                <TimelineCheckMarkSVG />
              </div>
              <div data-theme={exp.id == selectedExp ? "cmyk" : "lofi"} 
                className={`timeline-end timeline-box hover:cursor-pointer rounded-xl border-[1.5px] border-primary  box-border`}>
                <div className="text-lg font-black">{exp.title}</div>
                <div className="text-md italic">
                  {exp.organization}, Ended in {exp.endDate}
                </div>
              </div>
              <hr className="bg-primary" />
            </li>
            // <>
            //   &#x2022; {description}
            //   <br />
            // </>
          ))}
        </ul>
      </div>
      <div className="w-5/12 h-96 flex flex-col border-2 border-primary box-border rounded">
        {timelineExperience.map((exp: TimelineExperience) => (
          <div
            key={`exp-detail-${exp.id}`}
            className={`${exp.id == selectedExp ? "block" : "hidden"}`}
          >
            <ul>
              {/* {exp.descriptions.map((description) => (
                <li className="text-md">&#x2022; {description}</li>
              ))} */}
              {exp.id}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
