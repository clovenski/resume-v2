export interface Project {
  title: string
  href?: string
  period: string
  learningOutcomes: string[]
  description: string
  images?: string[]
}

export const projects: Project[] = [
  {
    title: 'VTuber Schedules',
    href: 'https://vtuberschedules.com/',
    period: 'Since 2023',
    learningOutcomes: [
      'Full stack engineering',
      'AWS - CloudFormation, CloudFront, Cloud Development Kit, Lambda, DynamoDB, Route53',
      'Angular',
    ],
    description:
      'Improved and generalized version of Nijisanji EN schedules; hosting schedules for VTubers of multiple platforms and agencies.',
  },
  {
    title: 'Nijisanji EN Schedules',
    href: 'https://nijisanji-en-schedules.com/',
    period: '2022',
    learningOutcomes: ['Full stack engineering', 'AWS - API Gateway, Lambda, DynamoDB, Route53', 'Angular'],
    description: 'Single page to quickly view Nijisanji EN stream schedules.',
  },
  {
    title: 'Deterministic Turing Machine Simulator',
    href: 'https://github.com/clovenski/dtm-simulator',
    period: '2019',
    learningOutcomes: ['Python Tkinter'],
    description: '',
    images: ['assets/dtm_sim_1.gif', 'assets/dtm_sim_2.jpg', 'assets/dtm_sim_3.jpg', 'assets/dtm_sim_4.jpg'],
  },
  {
    title: 'Circuit Simulator',
    href: 'https://github.com/clovenski/circuit-simulator',
    period: '2018',
    learningOutcomes: ['Object-oriented Programming', 'Topological ordering graph algorithm', 'Terminal-driven application'],
    description: '',
    images: ['assets/circuit_sim_1.gif'],
  },
]
