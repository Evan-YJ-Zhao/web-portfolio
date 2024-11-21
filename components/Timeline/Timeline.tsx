import TimelineCheckMarkSVG from "./TimelineCheckMarkSVG";
import timelineExperience, { TimelineExperience } from "./TimelineData";

const Timeline = () => {
  return (
    <div className="mt-12 w-4/6 justify-self-center flex justify-start">
      <ul className="timeline timeline-vertical [--timeline-col-start:auto]">
        {timelineExperience.map((exp: TimelineExperience) => (
          <li key={exp.id}>
            <hr />
            <div className="timeline-start min-w-20 text-end">
              {exp.startDate}
            </div>
            <div className="timeline-middle">
              <TimelineCheckMarkSVG />
            </div>
            <div className="timeline-end timeline-box">
              {exp.title && (
                <div className="text-lg font-black">{exp.title}</div>
              )}
              <div className="text-md italic">
                {exp.organization}, Completed in {exp.endDate}
              </div>
              {exp.descriptions.map((description) => (
                <>
                  &#x2022; {description}
                  <br />
                </>
              ))}
            </div>
            <hr />
          </li>
        ))}
        ;
      </ul>
    </div>
  );
};

export default Timeline;
