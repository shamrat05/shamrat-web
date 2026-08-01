import type { CMSData } from '../types/cms';

export const localData: CMSData = {
  hero: {
    name: "Shamrat Hossain",
    title: "Operations ➔ Marketing ➔ AI & Agentic Automations",
    description: "Proven operational leader & marketing strategist specializing in AI workflow automation (n8n, Zapier, Agentic AI). I bridge cross-departmental silos, eliminate manual bottlenecks, and drive measurable business efficiency.",
    image: "/images/shamrat-profile.jpg"
  },
  about: {
    description: [
      "I'm Md. Shamrat Hossain (also known as Samrat Hossain) — a results-driven professional who bridges operational discipline, marketing strategy, and next-generation AI automation. My career follows a natural evolution: starting in high-volume operations, expanding into data-backed marketing strategy, and culminating in designing production-grade AI agentic workflows using n8n, Zapier, and custom webhooks.",
      "From overseeing complex banking operations across 551+ outlets in 62 districts of Bangladesh to executing enterprise sales & marketing engines, my focus is cross-departmental collaboration. By connecting Sales, Finance, Operations, and Marketing through intelligent automated pipelines, I help businesses eliminate repetitive friction, cut human error, and save hundreds of operational hours monthly."
    ],
    stats: [
      { value: "551+", label: "Outlets Managed" },
      { value: "62", label: "Districts Covered" },
      { value: "n8n & Zapier", label: "AI Workflows" },
      { value: "40%+", label: "Time Saved" }
    ]
  },
  contact: {
    email: "shamrat.r.h@gmail.com",
    phone: "+88 01727-805705",
    linkedin: "https://linkedin.com/in/shamrat5",
    github: "https://github.com/shamrat5",
    facebook: "https://facebook.com/shamrat5",
    twitter: "https://twitter.com/shamrat5",
    location: "Azimpur, Dhaka, Bangladesh"
  },
  projects: [
    {
      id: 1,
      slug: "cross-departmental-ai-automation",
      title: "Cross-Departmental AI & Agentic Workflow Engine",
      category: "operations",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
      description: "Designed and deployed autonomous n8n and Zapier agentic workflows connecting Sales CRM, Operations tracking, and Finance webhooks to automate lead-to-fulfillment handoffs.",
      tags: ["n8n", "Zapier", "Agentic AI", "Process Automation"],
      link: "/portfolio/cross-departmental-ai-automation",
      technologies: ["n8n", "Zapier", "OpenAI API", "Webhooks", "HubSpot", "Google Sheets API"],
      challenge: "Manual handoffs between Sales, Operations, and Finance caused 48-hour delays and human data entry errors.",
      solution: "Implemented an agentic n8n pipeline with human-in-the-loop approval triggers.",
      results: ["70% reduction in processing time", "Zero data entry errors", "Saved 120+ hours/month"]
    },
    {
      id: 2,
      slug: "digital-marketing-strategy",
      title: "Digital Marketing Strategy & Campaign",
      category: "marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      description: "Developed comprehensive digital marketing strategy for metal industry products.",
      tags: ["Digital Marketing", "Market Research", "Strategy Development"],
      link: "/portfolio/digital-marketing-strategy",
      technologies: ["Google Analytics", "Facebook Ads", "SEMrush"],
      challenge: "Establishing digital presence in a traditional market.",
      solution: "Implemented multi-channel approach with targeted campaigns.",
      results: ["45% increase in traffic", "2x lead generation"]
    },
    {
      id: 3,
      slug: "email-marketing-automation",
      title: "Email Marketing Automation",
      category: "marketing",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
      description: "Designed and implemented automated email marketing campaigns using HubSpot and Zapier.",
      tags: ["Email Marketing", "HubSpot", "Zapier", "Marketing Automation"],
      link: "/portfolio/email-marketing-automation"
    },
    {
      id: 4,
      slug: "customer-journey-analytics",
      title: "Customer Journey Analytics",
      category: "analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      description: "Analyzed customer touchpoints and service delivery across banking outlets.",
      tags: ["Customer Analytics", "Journey Mapping", "UX Research"],
      link: "/portfolio/customer-journey-analytics"
    },
    {
      id: 5,
      slug: "banking-operations-optimization",
      title: "Banking Operations Process Optimization",
      category: "operations",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
      description: "Led initiative to optimize operational workflows across 62 districts.",
      tags: ["Process Improvement", "Automation", "Stakeholder Management"],
      link: "/portfolio/banking-operations-optimization"
    },
    {
      id: 6,
      slug: "banking-analytics-dashboard",
      title: "Banking Operations Analytics Dashboard",
      category: "analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      description: "Comprehensive Power BI dashboard analyzing performance metrics across 551+ banking outlets.",
      tags: ["Power BI", "Data Analytics", "Dashboard Design"],
      link: "/portfolio/banking-analytics-dashboard"
    }
  ],
  posts: [
    {
      id: 1,
      slug: "practical-ai-agentic-automation-n8n-zapier",
      title: "Beyond the Hype: How to Build Sustainable AI & Agentic Workflows with n8n and Zapier",
      date: "Feb 1, 2026",
      readTime: "6 min read",
      category: "AI & Automation",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop",
      description: "A practical, no-fluff operational guide to automating cross-departmental collaboration between Sales, Operations, and Finance without breaking business workflows.",
      link: "/blog/practical-ai-agentic-automation-n8n-zapier",
      content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold mt-8 mb-4">Introduction: Why Most AI Automations Fail in Production</h2>
        <p>In 2026, artificial intelligence is no longer just about generating text or answering questions in a chat window. The real competitive advantage lies in <strong>Agentic Automation</strong>—autonomous workflows that execute multi-step tasks across different departments.</p>
        <p>However, many businesses jump into AI automation with generic prompts and fragile setups, leading to broken data pipelines and frustrated teams. Having built workflows that connect Sales, Operations, and Finance, here is our battle-tested blueprint for creating sustainable, high-ROI automations using n8n, Zapier, and custom webhooks.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">1. The 3-Step Framework Before Writing Any Code or Workflow</h2>
        <p>Before touching n8n or Zapier, map your existing manual processes:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Identify the Friction Point:</strong> Where do team members spend hours manually copying data between CRM, email, and spreadsheets?</li>
          <li><strong>Define the Single Source of Truth:</strong> Decide which system owns customer records vs transactional data.</li>
          <li><strong>Establish Human-in-the-Loop Safeguards:</strong> High-stakes actions (such as sending invoices or updating bank balances) should trigger a slack/email approval button rather than running 100% blind.</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">2. Building Cross-Departmental Collaboration Workflows with n8n</h2>
        <p>n8n is exceptional for complex, multi-node workflows because it supports self-hosting, privacy compliance, and granular error-handling:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Sales to Operations Handoff:</strong> When a deal is marked "Closed-Won" in HubSpot, an n8n webhook creates the onboarding ticket in Jira, notifies the account manager, and generates a Google Drive client folder automatically.</li>
          <li><strong>Finance & Billing Sync:</strong> Automatically extract line items from signed contracts using structured LLM parsing, update QuickBooks/Xero, and ping the Finance team for validation.</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">3. When to Use Zapier vs n8n vs Custom Code</h2>
        <p>Choosing the right tool saves operational costs:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Zapier:</strong> Best for rapid 2-step integrations, SaaS app connectors, and quick prototypes.</li>
          <li><strong>n8n:</strong> Best for complex logic, multi-branch conditional loops, JSON transformations, and cost-effective scaling.</li>
          <li><strong>Custom Webhooks / Python:</strong> Best for heavy mathematical calculations, proprietary data formats, and direct database queries.</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">4. Measuring Real ROI: Time Saved vs Error Reduction</h2>
        <p>To evaluate if an automation is successful, track two core metrics:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Direct Hours Reclaimed:</strong> Measure team hours saved per week on repetitive data transfer.</li>
          <li><strong>SLA Velocity:</strong> Track how fast a customer request moves from initial contact to completed fulfillment.</li>
        </ul>

        <p class="mt-8 text-lg font-semibold">Sustainable automation isn't about replacing human judgment—it's about removing busywork so teams can focus on high-value strategy.</p>
      </div>`,
      tags: ["n8n", "Zapier", "Agentic AI", "AI Automation", "Operations"]
    },
    {
      id: 2,
      slug: "seo-cheat-sheet-2025",
      title: "The Ultimate SEO Cheat Sheet: How to Rank on Google and AI Search in 2026",
      date: "Dec 2, 2025",
      readTime: "4 min read",
      category: "SEO & Marketing",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop",
      description: "A comprehensive guide to SEO best practices for 2026, covering technical SEO, content optimization, and strategies for appearing in AI search results.",
      link: "/blog/seo-cheat-sheet-2025",
      content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold mt-8 mb-4">Introduction</h2>
        <p>Search Engine Optimization continues to evolve rapidly in 2026. With AI-powered search engines like ChatGPT, Google's AI Overviews, and voice assistants becoming mainstream, your SEO strategy must adapt. This cheat sheet covers everything you need to rank on both traditional and AI search results.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">1. Technical SEO Fundamentals</h2>
        <p><strong>Core Web Vitals:</strong> Google prioritizes user experience metrics. Focus on:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>LCP (Largest Contentful Paint): Keep under 2.5 seconds</li>
          <li>FID / INP: Aim for under 100ms</li>
          <li>CLS (Cumulative Layout Shift): Maintain below 0.1</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">2. Content Strategy for AI Search</h2>
        <p>AI search engines prioritize:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>E-E-A-T:</strong> Experience, Expertise, Authoritativeness, Trustworthiness</li>
          <li><strong>FACTS:</strong> Factual accuracy, with citations and sources</li>
          <li><strong>Originality:</strong> Unique insights, not just regurgitated content</li>
        </ul>
      </div>`,
      tags: ["SEO", "AI", "Marketing"]
    },
    {
      id: 3,
      slug: "data-driven-operations",
      title: "Data-Driven Decision Making in Operations",
      date: "Dec 5, 2025",
      readTime: "8 min read",
      category: "Data Analytics",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
      description: "How leveraging data analytics can transform operational efficiency and drive better business outcomes, with insights from managing 551+ banking outlets.",
      link: "/blog/data-driven-operations",
      content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold mt-8 mb-4">The Power of Data in Operations</h2>
        <p>In today's complex business environment, making informed decisions based on solid analytics is essential. Having managed operations across 551+ banking outlets, I've seen firsthand how data transforms operational efficiency.</p>
      </div>`,
      tags: ["Data Analytics", "Operations", "Business Intelligence"]
    }
  ],
  experience: [
    {
      id: 1,
      title: "Sales Lead & AI Automation Consultant",
      company: "LevelAxis Technologies",
      date: "Jan 2026 – Present",
      description: "Leading enterprise sales and designing cross-departmental AI automation workflows (n8n, Zapier, Agentic AI). Spearheading client acquisition, building software integration strategies, and streamlining sales-to-operations handoffs to eliminate manual data overhead.",
      tags: ["n8n", "Zapier", "Agentic AI", "Sales Leadership", "Cross-Departmental Collaboration"]
    },
    {
      id: 2,
      title: "Officer – Smart Banking Operations",
      company: "DOER Services PLC",
      date: "Nov 2024 – Aug 2025",
      description: "Managed daily operations for 551+ agent banking outlets across 62 districts as liaison between field teams, outlet owners, and Agrani Bank stakeholders. Overseeing SLA compliance, process optimization, and preparing monthly Bangladesh Bank performance reports.",
      tags: ["Operations Management", "Process Optimization", "Stakeholder Coordination", "Data Analysis"]
    },
    {
      id: 3,
      title: "Marketing Intern",
      company: "Kiam Metal Industries",
      date: "Dec 2023 – Mar 2024",
      description: "Supported marketing team in developing sales strategies and conducting market research to identify new business opportunities. Assisted in promotional campaign planning and competitive analysis for cookware products.",
      tags: ["Market Research", "Sales Strategy", "Competitive Analysis", "Campaign Planning"]
    }
  ],
  skills: {
    technical: [
      { name: 'n8n & Zapier Automation', level: 'expert', icon: 'Settings' },
      { name: 'Agentic AI & LLM Workflows', level: 'advanced', icon: 'Code' },
      { name: 'Advanced Excel / Google Sheets', level: 'expert', icon: 'FileSpreadsheet' },
      { name: 'Power BI Dashboarding', level: 'advanced', icon: 'BarChart' },
      { name: 'Data Analysis & Reporting', level: 'expert', icon: 'Database' },
      { name: 'CRM Systems & HubSpot', level: 'advanced', icon: 'Users' },
      { name: 'Python, VBA, JavaScript', level: 'advanced', icon: 'Code' },
    ],
    professional: [
      { name: 'Cross-Departmental Automation', level: 'expert', icon: 'Crosshair' },
      { name: 'Process & SLA Optimization', level: 'expert', icon: 'Target' },
      { name: 'Team Leadership', level: 'advanced', icon: 'Users' },
      { name: 'Customer & Stakeholder Relations', level: 'expert', icon: 'Handshake' },
      { name: 'Project Management', level: 'advanced', icon: 'ClipboardList' },
      { name: 'Strategic Execution', level: 'expert', icon: 'MessageSquare' },
    ]
  },
  certifications: [
    { title: 'Email & Marketing Automation Certificate', issuer: 'HubSpot Academy', icon: 'Award' },
    { title: 'Advanced MS Office & Data Certificate', issuer: 'Udemy', icon: 'Laptop' },
    { title: 'Professional Business Communication', issuer: 'Udemy', icon: 'MessageCircle' },
    { title: 'Best Presenter Award', issuer: 'Research on "The Future of E-Commerce in Bangladesh"', icon: 'Trophy' },
  ]
};