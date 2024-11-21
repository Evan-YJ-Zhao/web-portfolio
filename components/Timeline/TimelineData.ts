type TimelineExperience = {
  id: number;
  startDate: string;
  endDate: string;
  organization: string;
  title: string;
  descriptions: string[];
};

const timelineExperience: ReadonlyArray<TimelineExperience> = [
  {
    id: 0,
    startDate: "01/2019",
    endDate: "05/2019",
    title: "Instructional Student Assistant",
    organization: "San José State University",
    descriptions: ["Responsible for grading 30+ students' C++ programming projects."],
  },
  {
    id: 1,
    startDate: "09/2019",
    endDate: "10/2019",
    organization: "Directly Software Inc",
    title: "AI Resolve Trainer",
    descriptions: [
      "Managed and designed both AI training pipeline and AI content pipeline products.",
      "Reviewed input from end-users to improve the quality of the automation models.",
    ],
  },
  {
    id: 2,
    startDate: "10/2019",
    endDate: "11/2022",
    organization: "Directly (acquired by Movate Inc)",
    title: "Technical Support Engineer",
    descriptions: [
      "Collaborated with an agile team of 6 engineers to develop a robust API for an IVR system enabling a Fortune 500 client to integrate their IVR system with our platform, boosting annual revenue by more than $2.5M.",
      "Maintained and enhanced server-side applications to establish secure connections with the client's Azure backend services, facilitating monthly interactions between over 50,000 end-users and technical experts.",
      "Applied coding best practices in the development of 6 software products built with Grails or Node.js.",
      "Identified and resolved more than 450 technical issues, outages, and production bugs.",
      "Supported and documented over 15 client integration and internal projects.",
      "Drafted and presented 8 technical specifications, all approved by the team."
    ],
  },
  {
    id: 3,
    startDate: "11/2022",
    endDate: "08/2024",
    organization: "Xperi Inc",
    title: "Senior Software Engineer",
    descriptions: [""],
  },
];

export type { TimelineExperience };
export default timelineExperience;
