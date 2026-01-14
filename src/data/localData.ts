import type { CMSData } from '../types/cms';

export const localData: CMSData = {
  hero: {
    name: "Md. Shamrat Hossain",
    title: "Marketing & Operations Professional",
    description: "Results-driven marketing and operations professional with proven expertise in data analytics, stakeholder coordination, and strategic business execution.",
    image: "/images/shamrat-profile.jpg"
  },
  about: {
    description: [
      "I'm a dedicated marketing and operations professional with a strong foundation in business analytics and strategic planning. I have successfully completed my MBA in Marketing and bring hands-on experience in digital operations and stakeholder management.",
      "My professional journey spans managing complex banking operations across 551+ outlets to developing marketing strategies for industrial companies. I excel at turning data into actionable insights and building meaningful relationships that drive business growth."
    ],
    stats: [
      { value: "551+", label: "Outlets Managed" },
      { value: "62", label: "Districts Covered" },
      { value: "100%", label: "Client Satisfaction" },
      { value: "5+", label: "Certifications" }
    ]
  },
  contact: {
    email: "shamrat.r.h@gmail.com",
    phone: "+88 01727-805705",
    linkedin: "linkedin.com/in/shamrat5",
    location: "Azimpur, Dhaka, Bangladesh"
  },
  projects: [
    {
      id: 1,
      title: "Digital Marketing Strategy & Campaign",
      category: "marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      description: "Developed comprehensive digital marketing strategy for metal industry products.",
      tags: ["Digital Marketing", "Market Research", "Strategy Development"],
      link: "/portfolio/1",
      technologies: ["Google Analytics", "Facebook Ads", "SEMrush"],
      challenge: "Establishing digital presence in a traditional market.",
      solution: "Implemented multi-channel approach with targeted campaigns.",
      results: ["45% increase in traffic", "2x lead generation"]
    },
    {
      id: 2,
      title: "Email Marketing Automation",
      category: "marketing",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
      description: "Designed and implemented automated email marketing campaigns using HubSpot.",
      tags: ["Email Marketing", "HubSpot", "Marketing Automation"],
      link: "/portfolio/2"
    },
    {
      id: 3,
      title: "Customer Journey Analytics",
      category: "analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      description: "Analyzed customer touchpoints and service delivery across banking outlets.",
      tags: ["Customer Analytics", "Journey Mapping", "UX Research"],
      link: "/portfolio/3"
    },
    {
      id: 4,
      title: "Banking Operations Process Optimization",
      category: "operations",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
      description: "Led initiative to optimize operational workflows across 62 districts.",
      tags: ["Process Improvement", "Automation", "Stakeholder Management"],
      link: "/portfolio/4"
    },
    {
      id: 5,
      title: "Cross-Functional Team Coordination",
      category: "operations",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      description: "Led coordination between field teams, outlet owners, and bank stakeholders.",
      tags: ["Team Leadership", "Stakeholder Management", "Issue Resolution"],
      link: "/portfolio/5"
    },
    {
      id: 6,
      title: "Banking Operations Analytics Dashboard",
      category: "analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      description: "Comprehensive Power BI dashboard analyzing performance metrics across 551+ banking outlets.",
      tags: ["Power BI", "Data Analytics", "Dashboard Design"],
      link: "/portfolio/6"
    }
  ],
  posts: [
    {
      id: 1,
      title: "The Ultimate SEO Cheat Sheet: How to Rank on Google and AI Search in 2025",
      date: "Dec 2, 2025",
      readTime: "4 min read",
      category: "SEO & Marketing",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop",
      description: "A comprehensive guide to SEO best practices for 2025, covering technical SEO, content optimization, and strategies for appearing in AI search results.",
      link: "/blog/1",
      content: "<p>Full content would go here...</p>",
      tags: ["SEO", "AI", "Marketing"]
    },
    {
      id: 2,
      title: "Data-Driven Decision Making in Operations",
      date: "Dec 5, 2025",
      readTime: "2 min read",
      category: "Data Analytics",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
      description: "How leveraging data analytics can transform operational efficiency and drive better business outcomes, with insights from managing 551+ banking outlets.",
      link: "/blog/2"
    },
    {
      id: 3,
      title: "The Future of Digital Banking in Bangladesh",
      date: "Dec 8, 2025",
      readTime: "2 min read",
      category: "Digital Transformation",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=400&fit=crop",
      description: "Exploring how digital transformation is reshaping the banking landscape in Bangladesh, and what it means for traditional banking operations and customer experience.",
      link: "/blog/3"
    }
  ],
  experience: [
    {
      id: 1,
      title: "Officer – Smart Banking Operations",
      company: "DOER Services PLC",
      date: "Nov 2024 – Aug 2025",
      description: "Managed daily operations for 551+ agent banking outlets across 62 districts as liaison between field teams, outlet owners, and Agrani Bank stakeholders. Addressed compliance and ownership-related issues while monitoring outlet performance and preparing monthly Bangladesh Bank Transaction Reports.",
      tags: ["Operations Management", "Stakeholder Coordination", "Data Analysis", "Compliance"]
    },
    {
      id: 2,
      title: "Marketing Intern",
      company: "Kiam Metal Industries",
      date: "Dec 2023 – Mar 2024",
      description: "Supported marketing team in developing sales strategies and conducting market research to identify new business opportunities. Assisted in promotional campaign planning and competitive analysis for cookware products.",
      tags: ["Market Research", "Sales Strategy", "Competitive Analysis", "Campaign Planning"]
    }
  ],
  skills: {
    technical: [
      { name: 'Advanced Excel / Google Sheets', level: 'expert', icon: 'FileSpreadsheet' },
      { name: 'Power BI Dashboarding', level: 'advanced', icon: 'BarChart' },
      { name: 'Data Analysis & Reporting', level: 'expert', icon: 'Database' },
      { name: 'CRM Systems', level: 'intermediate', icon: 'Users' },
      { name: 'Business Automation', level: 'intermediate', icon: 'Settings' },
      { name: 'Python, VBA, JavaScript', level: 'advanced', icon: 'Code' },
    ],
    professional: [
      { name: 'Strategic Thinking', level: 'expert', icon: 'Target' },
      { name: 'Team Leadership', level: 'advanced', icon: 'Users' },
      { name: 'Customer Relations', level: 'expert', icon: 'Handshake' },
      { name: 'Project Management', level: 'advanced', icon: 'ClipboardList' },
      { name: 'Communication', level: 'expert', icon: 'MessageSquare' },
      { name: 'Stakeholder Coordination', level: 'expert', icon: 'Crosshair' },
    ]
  },
  certifications: [
    { title: 'Email Marketing Certification', issuer: 'HubSpot Academy', icon: 'Award' },
    { title: 'Advanced MS Office Certificate', issuer: 'Udemy', icon: 'Laptop' },
    { title: 'Professional English Communication', issuer: 'Udemy', icon: 'MessageCircle' },
    { title: 'Best Presenter Award', issuer: 'Research on "The Future of E-Commerce in Bangladesh"', icon: 'Trophy' },
  ]
};
