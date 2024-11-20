import TimelineCheckMarkSVG from "./TimelineCheckMarkSVG";

const Timeline = () => {
  return (
    <div className="mt-12 w-4/6 justify-self-center flex justify-start">
      <ul className="timeline timeline-vertical [--timeline-col-start:auto]">
        <li>
          <div className="timeline-start min-w-20 text-end">05/2019</div>
          <div className="timeline-middle">
            <TimelineCheckMarkSVG />
          </div>
          <div className="timeline-end timeline-box">
          <div className="text-lg font-black">First Macintosh computer</div>
          <div className="text-md italic">First Macintosh computer</div>

            First Macintosh computer ntosh computer First Macintntosh computer
            First Macintntosh computer First Macintntosh computer First
            Macintntosh computer First Macintntosh computer First Macintntosh
            computer First MacintFirst Macintosh computerFirst Macintosh
            computerFirst Macintosh computerFirst Macintosh computer
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start min-w-20 text-end">1998</div>
          <div className="timeline-middle">
            <TimelineCheckMarkSVG />
          </div>
          <div className="timeline-end timeline-box">iMac</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">2001</div>
          <div className="timeline-middle">
            <TimelineCheckMarkSVG />
          </div>
          <div className="timeline-end timeline-box">iPod</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">2007</div>
          <div className="timeline-middle">
            <TimelineCheckMarkSVG />
          </div>
          <div className="timeline-end timeline-box">iPhone</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">2015</div>
          <div className="timeline-middle">
            <TimelineCheckMarkSVG />
          </div>
          <div className="timeline-end timeline-box">Apple Watch</div>
        </li>
      </ul>
    </div>
  );
};

export default Timeline;
