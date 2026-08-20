export interface EmploymentEntry {
  title: string
  company: string
  location: string
  period: string
  bullets: string[]
}

export interface EducationEntry {
  degree: string
  school: string
  period: string
  details: string[]
}

export interface RecognitionEntry {
  title: string
  org: string
  period: string
  description: string
}

export const profile = {
  name: 'Joel Tengco',
  title: 'Senior Software Engineer',
  location: 'Los Angeles, United States',
  email: 'joeltengco3510@gmail.com',
  summary:
    'Senior software engineer specializing in high-scale, reliability-critical backend systems — most recently payments infrastructure that processed $13.2B in transaction volume for 4.4M customers. Learns fast and ships at high velocity, with rigorous system design, testing, and documentation as core disciplines.',
}

export const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joel-tengco-a1710218a/' },
  { label: 'GitHub', href: 'https://github.com/clovenski' },
  { label: 'VTuber Schedules', href: 'https://vtuberschedules.com/' },
]

export const employment: EmploymentEntry[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Intuit',
    location: 'Los Angeles',
    period: 'Aug 2024 — Jul 2026',
    bullets: [
      'Built the throttling and prioritization platform behind $13.2B in tax refunds delivered to 4.4M customers in the 2026 tax season, throttling ACH and RTP payment processing to 200 TPS and prioritizing time-sensitive ACH transfers as per third-party vendor rate limits.',
      "Owned the core backend service behind funds distribution for Turbo Tax's 5 Days Early program, including a webhook ingestion platform, built on an in-house JavaScript-based framework, that processed 14M+ vendor events during the 2026 tax season (Jan–Jun).",
      "Designed core components of the throttling platform — including its DynamoDB data model, background job orchestration, and graceful shutdown mechanism — and led its performance testing; staffed the launch war room during the platform's rollout in the 2026 tax season.",
    ],
  },
  {
    title: 'Software Engineer II',
    company: 'Intuit',
    location: 'Los Angeles',
    period: 'May 2022 — Aug 2024',
    bullets: [
      "Built the trade execution and end-of-day reconciliation layer for QuickBooks' crypto trading service, integrating pass-through order execution with a third-party vendor's APIs to enable QuickBooks users to buy, sell, and hold cryptocurrency.",
      'Served as the designated Operational Excellence Champion, coordinating code coverage, disaster recovery readiness, and security priorities between engineering leadership and three engineering teams.',
      'Spearheaded backend development for a generative AI prototype, built during a company-wide two-week hackathon, that let QuickBooks customers take action directly from email interactions.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Orange Logic',
    location: 'Irvine',
    period: 'Sept 2019 — May 2022',
    bullets: [
      'Delivered digital asset management deployments for roughly 30 client organizations, implementing bespoke workflows on a proprietary C# framework backed by SQL Server.',
      'Built an internal observability tool that automated generation of application debug analysis files, saving an estimated 10 minutes per incident.',
      'Built a scheduled reconciliation job that enforced referential integrity across a 50M+ record graph-structured dataset modeling relationships between digital assets, eliminating orphaned records.',
    ],
  },
]

export const education: EducationEntry[] = [
  {
    degree: 'Computer Science, B.S.',
    school: 'California Polytechnic State University, Pomona',
    period: 'Sept 2017 — May 2019',
    details: ['magna cum laude, 3.73 GPA', "2017-18, 2018-19 President's Honor List"],
  },
  {
    degree: 'Mathematics for Transfer',
    school: 'Cerritos College',
    period: 'Aug 2014 — Jun 2017',
    details: ["Spring 2016 President's Honors List", 'Graduation with Highest Honors'],
  },
]

export const skills = [
  'Java',
  'TypeScript',
  'Python',
  'Kotlin',
  'C#',
  'Scala',
  'PostgreSQL',
  'SQL Server',
  'Docker',
  'Jenkins',
  'TeamCity',
  'Kafka',
  'Apache Pulsar',
  'AWS',
  'CloudFormation',
  'Angular',
  'Claude',
  'Gatling',
  'PagerDuty',
  'Splunk',
]

export const recognition: RecognitionEntry[] = [
  {
    title: "President's Honor List",
    org: 'California Polytechnic State University, Pomona',
    period: '2018 - 2019',
    description:
      'For the Fall and Spring semesters, I took at least 12 units and maintained a GPA of 3.5 or higher in each semester.',
  },
  {
    title: "President's Honor List",
    org: 'California Polytechnic State University, Pomona',
    period: '2017 - 2018',
    description:
      'For the Fall, Winter and Spring quarters, I took at least 12 units and maintained a GPA of 3.5 or higher in each quarter.',
  },
  {
    title: 'Graduation with Highest Honors',
    org: 'Cerritos College',
    period: '2017',
    description: 'I graduated with an undergraduate cumulative GPA of over 3.7.',
  },
  {
    title: "President's Honors List",
    org: 'Cerritos College',
    period: 'Spring 2016',
    description: 'I took at least 12 units in Spring 2016 and ended with a 4.0 GPA.',
  },
]
