export interface Project {
  title: string
  href?: string
  period: string
  learningOutcomes: string[]
  description: string
  demoVideo?: string
  images?: string[]
  fullVideoUrl?: string
  architectureDiagram?: string
}

export const projects: Project[] = [
  {
    title: 'Kikitori',
    href: 'https://github.com/clovenski/kikitori',
    period: 'Oct 14, 2026 - Oct 15, 2026',
    learningOutcomes: [
      'Electron desktop app development',
      'Local-first AI - whisper.cpp speech recognition and llama.cpp translation and summaries',
      'React and TypeScript',
      'Packaging and releasing a Windows installer with auto-update via GitHub Releases',
    ],
    description:
      'Desktop app that takes in Japanese YouTube videos, transcribes the audio, translates it to English and shows subtitles that follow along with the video. Everything runs locally on the user\'s own computer, with no cloud services or API costs. Long videos and streams are processed in chunks and can be resumed, and a first-run wizard picks the right tools and models for the user\'s hardware (NVIDIA GPU or CPU). Also generates timestamped summaries and can follow YouTube channels for new videos.',
    images: ['assets/kikitori-job.png'],
  },
  {
    title: 'VTuber Schedules Search',
    href: 'https://vtuberschedules.com/',
    period: 'Oct 10, 2026 - Oct 12, 2026',
    learningOutcomes: [
      'Agentic AI development with Claude Code',
      'Event-driven architecture',
      'AWS - DynamoDB Streams, SQS, S3, Lambda, CloudFront, Cloud Development Kit',
      'Angular',
    ],
    description:
      'Search for VTuber Schedules, designed with Claude and built in 3 days using Claude Code for the infrastructure as code and the Angular frontend. DynamoDB changes are debounced and merged into a compact gzipped index in S3, served through CloudFront and searched in the browser with MiniSearch, avoiding the $20+/mo cost of a managed search service. Biggest cost factor is the Lambda request cound due to DynamoDB streams, and Cloudwatch alarms. I expect around $3/mo max additional cost here.',
    architectureDiagram: 'assets/vts-search-architecture.svg',
  },
  {
    title: 'VTuber Meet and Greets POC',
    href: 'https://youtu.be/uYnrQZebZng',
    period: 'Aug 2026',
    learningOutcomes: ['Agentic AI development with Claude'],
    description:
      'Proof of concept for a platform that hosts meet and greets between VTubers and their fans.',
    demoVideo: 'assets/vmg-demo-short-compressed.mp4',
    fullVideoUrl: 'https://youtu.be/uYnrQZebZng',
  },
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
    architectureDiagram: 'assets/vtuber-schedules-architecture.png',
  },
  {
    title: 'Nijisanji EN Schedules',
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
