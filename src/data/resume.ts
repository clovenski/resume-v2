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
    'Software engineer with a passion towards devops and infrastructure engineering. Learns, adapts, and delivers code at a high velocity. High quality code design, documentation, and testing are my pillars in software engineering.',
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
    location: 'Los Angeles, CA',
    period: 'Aug 2024 — Jul 2026',
    bullets: [
      "Developed the core backend service behind funds distribution within Intuit's Turbo Tax 5 Days Early program; major contribution being developing a platform that we used for consuming webhooks from our third-party vendor.",
      'Developed core backend components of a throttling and prioritization platform that optimized ACH and RTP payment processing by prioritizing time-sensitive ACH transfers while enforcing third-party API rate limits at scale; enabling the delivery of $13.2B in tax refunds to 4.4M customers during tax year 2025.',
      'Leveraged Claude, Cursor, Augment, and custom Claude skills/commands to automate development workflows, accelerate implementation, and reduce engineering toil.',
    ],
  },
  {
    title: 'Software Engineer II',
    company: 'Intuit',
    location: 'Los Angeles',
    period: 'May 2022 — Aug 2024',
    bullets: [
      "Contributed to launching the service that provides the capability for Intuit's QuickBooks users to buy, sell, and hold cryptocurrencies.",
      'Served as Operational Excellence Champion across three engineering teams, driving initiatives focused on code coverage, disaster recovery readiness, and security.',
      'Spearheaded backend development for a generative AI initiative enabling QuickBooks customers to take action directly from customer email interactions.',
      'Developed a proof of concept leveraging generative AI to assist engineers in resolving support channel inquiries and improving developer productivity.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Orange Logic',
    location: 'Irvine',
    period: 'Sept 2019 — May 2022',
    bullets: [
      'Provide organizations a digital asset management web application completely suited to their needs and custom workflows.',
      'Developed a proprietary monitoring solution to eliminate the toil around producing debug analysis files of the app.',
      'Developed a background cron job that maintains consistency in a graph-structured database table that contains over 50M records.',
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
