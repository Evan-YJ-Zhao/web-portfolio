type TimelineExperience = {
  readonly id: number; // id must be positive
  startDate: string;
  endDate: string;
  organization: string;
  title: string;
  readonly descriptions: Readonly<string[]>;
};

const timelineExperience: ReadonlyArray<TimelineExperience> = [
  {
    id: 0,
    startDate: "01/2019",
    endDate: "05/2019",
    title: "Instructional Student Assistant",
    organization: "San José State University",
    descriptions: Object.freeze([
      "Responsible for grading 30+ students' C++ programming projects.",
    ]),
  },
  {
    id: 1,
    startDate: "09/2019",
    endDate: "10/2019",
    organization: "Directly Software Inc",
    title: "AI Resolve Trainer",
    descriptions: Object.freeze([
      "Managed and designed both AI training pipeline and AI content pipeline products.",
      "Reviewed input from end-users to improve the quality of the automation models.",
    ]),
  },
  {
    id: 2,
    startDate: "10/2019",
    endDate: "11/2022",
    organization: "Directly (acquired by Movate Inc)",
    title: "Technical Support Engineer",
    descriptions: Object.freeze([
      "Collaborated with an agile team of 6 engineers to develop a robust API for a Fortune 500 client to integrate their IVR system with our platform, boosting annual revenue by more than $2.5M.",
      "Maintained and enhanced server-side applications to establish secure connections with the client's Azure backend services, facilitating monthly interactions between over 50,000 end-users and technical experts.",
      "Applied coding best practices in the development of 6 software products built with Grails or Node.js.",
      "Identified and resolved more than 450 technical issues, outages, and production bugs.",
      "Supported and documented over 15 client integration and internal projects.",
      "Drafted and presented 8 technical specifications, all approved by the team.",
    ]),
  },
  {
    id: 3,
    startDate: "11/2022",
    endDate: "08/2024",
    organization: "Xperi Inc",
    title: "Senior Software Engineer",
    descriptions: Object.freeze([
      "Contributed as a member of a cross-functional team of 5 engineers in an Agile environment to prioritize and address issues potentially impacting millions of Android set-top boxes around the globe.",
      "Designed and implemented more than 10 sophisticated Splunk dashboards and reports capable of efficiently processing hundreds of millions of events, enabling in-depth analysis of complex and critical challenges.",
      "Created a set of guidelines and automated scripts to manage error codes, ensuring consistent documentation and improving error monitoring.",
      "Developed Bash scripts to identify redundant resources, with the goal of reducing overall application size.",
      "Leveraged Splunk IT Service Intelligence to proactively monitor real-time errors.",
      "Resolved and completed over 150 issues and tasks, ensuring high standards of quality.",
    ]),
  },
];

export type { TimelineExperience };
export default timelineExperience;
