import { useRef, useState } from "react";
import TimelineCheckMarkSVG from "./TimelineCheckMarkSVG";
import timelineExperience, { TimelineExperience } from "./TimelineData";

const TimelineMobile = () => {
  const [selectedExp, setSelectedExp] = useState<number>(-1);
  const experienceDetailModalRefs = useRef<(HTMLDialogElement | null)[]>([]);

  const expSummaryOnClickHandler = (id: number) => () => {
    setSelectedExp(id);
    experienceDetailModalRefs.current[id]?.showModal();
  };

  const expDetailModalOnClickHandler = () => {
    setSelectedExp(-1);
  };

  const isSelected = (id: number) => id == selectedExp;

  return (
    <div className="mt-12 mb-8 flex justify-evenly">
      <div className="flex justify-start">
        <ul className="timeline timeline-vertical [--timeline-col-start:auto]">
          {timelineExperience.map((exp: TimelineExperience, index: number) => (
            <li
              key={`exp-summary-${exp.id}`}
              className="min-h-[6.2rem]"
              onClick={expSummaryOnClickHandler(exp.id)}
            >
              {index != 0 && <hr className="bg-primary" />}
              <div className="timeline-start min-w-20 text-end max-phone-lg:hidden">
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

      {timelineExperience.map((exp: TimelineExperience) => (
        <dialog
          key={`exp-detail-modal-${exp.id}`}
          className="modal"
          ref={(el) => {
            experienceDetailModalRefs.current[exp.id] = el;
          }}
        >
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={expDetailModalOnClickHandler}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">{exp.title}</h3>
            {exp.descriptions.map((description, index) => (
              <p
                key={`exp-detail-list-item-${exp.id}-${index}`}
                className="py-4"
              >{`${index + 1}) ${description}`}</p>
            ))}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={expDetailModalOnClickHandler}>close</button>
          </form>
        </dialog>
      ))}
    </div>
  );
};

export default TimelineMobile;
