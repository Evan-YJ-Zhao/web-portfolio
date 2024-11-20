type TimelineExperience = {
  id: number;
  startDate: string;
  endDate: string;
  organization: string;
  title?: string;
  description: string[];
};

const timelineExperience: ReadonlyArray<TimelineExperience> = [
  {
    id: 0,
    startDate: "01/2019",
    endDate: "05/2019",
    organization: "San José State University",
    title: "Instructional Student Assistant",
    description: [
      "Responsible for grading 30+ students' C++ programming projects.",
    ],
  },
  {
    id: 1,
    startDate: "08/2015",
    endDate: "05/2019",
    organization: "San José State University",
    description: ["Bachelor of Science in Computer Science"],
  },
  {
    id: 2,
    startDate: "09/2019",
    endDate: "10/2019",
    organization: "Directly Software Inc",
    title: "AI Resolve Trainer",
    description: [
      "Managed and designed both AI training pipeline and AI content pipeline products.",
      "Reviewed input from end-users to improve the quality of the automation models.",
    ],
  },
];

export type { TimelineExperience };
export default timelineExperience;
