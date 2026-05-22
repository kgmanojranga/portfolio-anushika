import type { ProfileData } from '../types';
import wandrlustImg from '../assets/project-images/wandrlust.png';
import draftableImg from '../assets/project-images/draftables.png';
import staryoImg from '../assets/project-images/staryo.png';
import shopAssistImg from '../assets/project-images/shop-assist.png';

export const profile: ProfileData = {
  personal: {
    name: 'Anushika Nayomi',
    tagline: 'Project Manager & Operations Professional',
    bio: 'Experienced in coordinating digital products, cross-functional teams, and business operations across fast-paced environments. With a background in engineering, web development, and project delivery, I focus on bringing structure, visibility, and streamlined execution to complex workflows.',
    location: 'Colombo, Sri Lanka',
    email: 'anushikanayomi2@gmail.com',
    phone: '(+94) 74 023 9054',
    social: [
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/anushika-nayomi',
        icon: 'linkedin',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/Nayo-me',
        icon: 'github',
      },
      {
        label: 'Email',
        url: 'mailto:anushikanayomi2@gmail.com',
        icon: 'email',
      },
    ],
  },

  focusAreas: [
    {
      title: 'Project Management',
      description:
        'Bridging strategy, execution, and team coordination to turn ideas into delivered outcomes. With versatile experience across project management, operations, web development, and engineering, I focus on creating structure, improving workflows, and aligning teams toward business goals.',
    },
    {
      title: 'Operations & Administration',
      description:
        'Streamlining workflows, managing procurement, coordinating events, and keeping organizational processes running efficiently.',
    },
    {
      title: 'Product & Client Coordination',
      description:
        'Bridging the gap between clients and delivery teams by gathering requirements, managing feedback loops, and ensuring alignment.',
    },
    {
      title: 'Process Improvement',
      description:
        'Researching tools and strategies to improve delivery quality, reduce manual effort, and introduce smarter automation.',
    },
  ],

  experience: [
    {
      role: 'IT Projects & Operations Manager',
      company: 'Metarune Labs',
      location: 'Colombo, Sri Lanka',
      period: 'Jan 2025 – Jan 2026',
      type: 'full-time',
      description:
        'Managed agile delivery across multiple product teams, overseeing sprint execution, client coordination, operations, and cross-functional reporting at a tech startup.',
      highlights: [
        'Led end-to-end agile project management across 7 sprints for a team of 8–10 on the Wandrlust mobile app, delivering an App Store-ready product.',
        'Coordinated three concurrent projects (Draftable White Labelling, HeyStream, and Graffiti), overseeing delivery progress through structured tracking systems and Jira dashboards.',
        'Drafted user stories, identified bugs, and managed payment disputes for the Staryo platform.',
        'Coordinated directly with clients to manage feedback, change requests, and delivery expectations throughout the project lifecycle.',
        'Initiated and maintained Jira dashboards, KPI trackers, and reporting systems to improve project visibility across multiple projects.',
        'Conducted research across operational and business needs, including competitor analysis, process optimization, automation opportunities, product positioning, and CEO/CTO-led strategic activities.',
        'Supported recruitment coordination and hiring activities, including scheduling and administrative support.',
        'Managed end-to-end corporate gift box procurement and company event coordination.',
        'Led lead generation efforts: defined ICPs, built outreach templates, and iterated with the team.',
      ],
      tools: [
        'Jira',
        'Notion',
        'Slack',
        'Google Workspace',
        'Stripe',
        'Apollo',
        'LinkedIn',
      ],
      projects: [
        {
          name: 'Wandrlust',
          description:
            'Led end-to-end agile delivery across 7 sprints for a travel mobile app, managing a team of 8–10 and shipping an App Store-ready product.',
          tags: ['Mobile', 'Agile', 'iOS'],
          image: wandrlustImg,
        },
        {
          name: 'Draftable',
          description:
            'Coordinated sprint cycles and maintained structured Jira dashboards for this document comparison SaaS product.',
          tags: ['SaaS', 'Jira', 'Sprint Management'],
          image: draftableImg,
        },
        {
          name: 'Staryo',
          description:
            'Drafted user stories, identified and logged bugs, and managed payment disputes for this platform.',
          tags: ['QA', 'Stripe', 'User Stories'],
          image: staryoImg,
        },
        {
          name: 'Shop Assist',
          description:
            'Conducted competitor research and market analysis to support CTO-led product initiatives.',
          tags: ['Research', 'Market Analysis'],
          image: shopAssistImg,
        },
        {
          name: 'HeyStream',
          description:
            'Managed delivery coordination and cross-team reporting for a live streaming platform project.',
          tags: ['Streaming', 'Operations'],
        },
        {
          name: 'Graffiti',
          description:
            'Oversaw project tracking and sprint reporting for a creative content platform.',
          tags: ['Content', 'Coordination'],
        },
      ],
    },
    {
      role: 'English Instructor',
      company: 'Golden Talks Academy',
      location: 'Kegalle, Sri Lanka',
      period: 'Aug 2022 – Mar 2025',
      type: 'part-time',
      description:
        'Delivered IELTS speaking instruction and written feedback to students, evaluating progress and reporting results to the academy.',
      highlights: [
        'Conducted IELTS speaking sessions and provided structured feedback on student essays.',
        'Evaluated student score levels and reported progress to the academy.',
      ],
    },
    {
      role: 'Web Developer',
      company: 'Electrily',
      location: 'Colombo, Sri Lanka',
      period: 'Jan 2023 – Aug 2023',
      type: 'full-time',
      description:
        'Built and maintained features for MyGP Portal, a private healthcare appointment platform serving the Australian market, working within a cross-functional team.',
      highlights: [
        'Contributed to the MyGP Portal, a private healthcare appointment platform for the Australian market.',
        'Built new pages, modals, and features; resolved bugs to improve user experience.',
        'Worked with a multi-role user system (GP, Specialist, Practice, Hospital, etc.) and managed data via PostgreSQL.',
      ],
      tools: [
        'Angular',
        'Sails JS',
        'PostgreSQL',
        'HTML',
        'CSS',
        'Jira',
        'Bitbucket',
      ],
    },
    {
      role: 'Geotechnical Engineer (Internship)',
      company: 'Central Engineering Consultancy Bureau (CECB)',
      location: 'Colombo, Sri Lanka',
      period: 'Oct 2020 – Apr 2021',
      type: 'internship',
      description:
        'Performed geotechnical laboratory and field testing, contributed to Environmental Impact Assessment surveys, and prepared technical reports.',
      highlights: [
        'Conducted geotechnical laboratory and field tests (soil, aggregate, rock, concrete).',
        'Contributed to two Environmental Impact Assessment surveys.',
        'Prepared technical reports and time schedules for field tests.',
      ],
    },
  ],

  education: [
    {
      degree: 'B.Sc Engineering (Hons) in Earth Resources',
      institution: 'University of Moratuwa',
      period: 'Aug 2017 – Jul 2022',
      details: 'GPA: 3.15 / 4.20 · Second Class (Lower) · 161.5 Credits',
    },
  ],

  certifications: [
    {
      title: 'Foundations of Project Management & Project Initiation',
      issuer: 'Google / Coursera',
    },
    {
      title: 'Certificate in Python for Beginners',
      issuer: 'CODL – University of Moratuwa',
    },
    {
      title: 'Certificate in Web Design for Beginners',
      issuer: 'CODL – University of Moratuwa',
    },
    {
      title: 'Certificate in Front End Web Development',
      issuer: 'CODL – University of Moratuwa',
    },
  ],

  projects: [
    {
      title:
        'Spatiotemporal Growth Dynamics of Invasive Plant Distribution in Bolgoda Lake',
      description:
        'Final year research project using GIS-based analysis to study invasive plant spread. Published on IEEE Xplore.',
      link: 'https://ieeexplore.ieee.org/document/9906269',
      tags: ['GIS', 'Research', 'Environmental'],
    },
    {
      title: 'Real-Time Underground Trolley Monitoring System',
      description:
        'Design project developing a real-time tracking and controlling system for underground trolleys.',
      tags: ['Engineering', 'IoT', 'Design'],
    },
  ],

  memberships: [
    'Associate Member – Institute of Engineering, Sri Lanka (AMIESL)',
    'Earth Resources Engineering Society – University of Moratuwa',
    'Rotaract Club – University of Moratuwa',
  ],
};
