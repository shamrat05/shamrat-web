import type { CMSData } from '../types/cms';

export const localData: CMSData = {
  hero: {
    name: "Shamrat Hossain",
    title: "Operations ➔ Sales & Marketing ➔ Agentic AI & Automation",
    description: "Results-driven professional specializing in business process automation. I bridge operational discipline, sales & marketing strategy, and agentic AI to eliminate cross-departmental friction and drive enterprise efficiency.",
    image: "/images/shamrat-profile.jpg"
  },
  about: {
    description: [
      "I am Md. Shamrat Hossain, a results-driven professional specializing in operational architecture, sales and marketing strategy, and agentic AI automation. My career spans high-volume operations management, data-backed growth strategies, and production-grade automated business pipelines.",
      "Having managed banking operations across 551+ outlets in 62 districts of Bangladesh and executed enterprise sales initiatives, my focus is cross-departmental efficiency. By connecting Sales, Finance, Operations, and Marketing through intelligent workflows, I help organizations eliminate manual friction, reduce operational risk, and scale business performance."
    ],
    stats: [
      { value: "551+", label: "Outlets Managed" },
      { value: "62", label: "Districts Covered" },
      { value: "100+", label: "AI Workflows Automated" },
      { value: "40%+", label: "Efficiency Gained" }
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
      slug: "24-7-agentic-support-conversion-engine",
      title: "24/7 Autonomous Agentic Support & Lead Conversion Engine",
      category: "ai-automation",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop",
      description: "Deployed a context-aware AI agent operating 24/7 that checks interaction history, personalizes responses based on interest zones, qualifies prospects, and drives revenue growth.",
      tags: ["Agentic AI", "24/7 Support", "Lead Conversion", "Context History", "CRM Sync"],
      link: "/portfolio/24-7-agentic-support-conversion-engine",
      technologies: ["Agentic AI", "OpenAI API", "HubSpot CRM", "n8n", "Zapier", "REST Webhooks"],
      challenge: "After-hours inquiries experienced 24+ hour response delays, resulting in lost qualified prospects.",
      solution: "Engineered an autonomous support agent that retrieves customer history, customizes responses around buyer interest zones, and books sales appointments automatically.",
      results: ["24/7 instant response coverage", "3.2x increase in lead conversion", "Saved 140+ support hours/month"]
    },
    {
      id: 2,
      slug: "automated-content-campaign-engine",
      title: "Automated Social Media Content & Multi-Channel Campaign Engine",
      category: "ai-automation",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
      description: "Built an automated content pipeline that generates market-aligned social media content, runs targeted auto-campaigns, and tracks prospect engagement across channels.",
      tags: ["Content Automation", "Social Media", "Auto Campaigns", "Lead Tracking"],
      link: "/portfolio/automated-content-campaign-engine",
      technologies: ["n8n", "OpenAI API", "Meta Graph API", "LinkedIn API", "Google Analytics"],
      challenge: "Maintaining consistent multi-channel marketing required hours of daily manual effort.",
      solution: "Implemented an automated pipeline that generates trend-aligned content drafts, schedules posts across platforms, and tracks prospect click-through behavior.",
      results: ["5x increase in content output", "Automated multi-channel distribution", "40% higher campaign engagement"]
    },
    {
      id: 3,
      slug: "cross-departmental-ai-automation",
      title: "Cross-Departmental Business Process & Operations Automation",
      category: "operations",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
      description: "Automated end-to-end handoffs between Sales, Operations, and Finance to ensure business operates smoothly with zero manual data entry bottlenecks.",
      tags: ["Process Automation", "n8n", "Zapier", "Workflow Engineering", "SLA Optimization"],
      link: "/portfolio/cross-departmental-ai-automation",
      technologies: ["n8n", "Zapier", "Webhooks", "HubSpot", "Google Sheets API"],
      challenge: "Manual handoffs between Sales, Operations, and Finance caused 48-hour delays and data entry errors.",
      solution: "Implemented an agentic pipeline with human-in-the-loop approval triggers.",
      results: ["70% reduction in fulfillment SLA time", "Zero human data entry errors", "Saved 120+ hours/month"]
    },
    {
      id: 4,
      slug: "customer-journey-analytics",
      title: "Context-Aware Customer Journey & History Intelligence",
      category: "analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      description: "Integrated real-time interaction history tracking into customer communications, allowing AI agents and sales teams to personalize dialog based on past interest zones.",
      tags: ["Customer History", "Personalization", "Data Analytics", "CRM Intelligence"],
      link: "/portfolio/customer-journey-analytics"
    },
    {
      id: 5,
      slug: "enterprise-growth-strategy",
      title: "Data-Backed Growth & Enterprise Expansion Strategy",
      category: "strategy-growth",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
      description: "Designed data-backed market expansion framework for technology services, aligning sales operations with target customer segments.",
      tags: ["Growth Strategy", "Market Expansion", "Sales Operations", "Strategic Execution"],
      link: "/portfolio/enterprise-growth-strategy"
    },
    {
      id: 6,
      slug: "digital-marketing-strategy",
      title: "Digital Marketing Strategy & Lead Acquisition Campaign",
      category: "marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      description: "Developed comprehensive multi-channel digital marketing strategy for metal industry products.",
      tags: ["Digital Marketing", "Market Research", "Lead Generation"],
      link: "/portfolio/digital-marketing-strategy"
    },
    {
      id: 7,
      slug: "banking-analytics-dashboard",
      title: "Banking Operations Analytics & Executive Decision Support",
      category: "operations",
      image: "https://images.unsplash.com/photo-1556742049-0a67d9834169?w=800&h=500&fit=crop",
      description: "Comprehensive Power BI dashboard analyzing performance metrics and operational efficiency across 551+ banking outlets.",
      tags: ["Power BI", "Operations", "Decision Support", "Data Analytics"],
      link: "/portfolio/banking-analytics-dashboard"
    }
  ],
  posts: [
    {
      id: 1,
      slug: "how-we-automate-business-operations-agentic-ai",
      title: "How We Automate Business Operations with Agentic AI: 24/7 Lead Conversion, Context-Aware Personalization & Automated Campaigns",
      date: "Feb 1, 2026",
      readTime: "7 min read",
      category: "AI & Automation",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop",
      description: "A comprehensive, practical guide on building autonomous agentic AI workflows that operate 24/7, inspect customer interaction history, run personalized campaigns, and drive business revenue.",
      link: "/blog/how-we-automate-business-operations-agentic-ai",
      content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold mt-8 mb-4">Introduction: Beyond Static Chatbots and Manual Friction</h2>
        <p>Most business owners have experienced generic chatbots that fail to understand customer context and annoy prospects instead of helping them. Real business automation is about building an <strong>Agentic Business System</strong> that operates 24/7, checks past customer interaction history, runs automated marketing campaigns, and drives revenue growth without manual intervention.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">System Architecture: How Context-Aware Business Automation Works</h2>
        <p>Below is the architectural blueprint connecting customer touchpoints, interaction memory, automated marketing, and executive decision-support analytics:</p>

        <pre class="bg-bg-surface p-6 rounded-xl font-mono text-xs md:text-sm text-primary-400 overflow-x-auto border border-white/10 leading-relaxed">
┌─────────────────────────┐       ┌──────────────────────────────┐
│  Prospect / Customer    │ ────► │  Omnichannel Touchpoint      │
│  (Website / WhatsApp)   │       │  (24/7 Agentic AI Support)   │
└─────────────────────────┘       └──────────────┬───────────────┘
                                                 │
                                                 ▼
┌─────────────────────────┐       ┌──────────────────────────────┐
│  CRM History & Memory   │ ◄───► │  Context-Aware Engine        │
│  (Past Interest Zones)  │       │  (Evaluates Preferences)     │
└─────────────────────────┘       └──────────────┬───────────────┘
                                                 │
                                                 ▼
┌─────────────────────────┐       ┌──────────────────────────────┐
│  Automated Campaigns    │ ◄───► │  Autonomous Action Engine    │
│  & Social Content Gen   │       │  (Schedules, Converts, Syncs)│
└─────────────────────────┘       └──────────────┬───────────────┘
                                                 │
                                                 ▼
                                  ┌──────────────────────────────┐
                                  │  Executive Decision Support  │
                                  │  (Analytics & Revenue Metrics)│
                                  └──────────────────────────────┘
        </pre>

        <h2 class="text-2xl font-bold mt-8 mb-4">1. 24/7 Instant Support & Autonomous Revenue Conversion</h2>
        <p>High-intent prospects do not wait 24 hours for an email reply. An autonomous AI support agent operates around the clock, answering technical questions, qualifying lead intent, and guiding prospects into booking sales calls or completing orders instantly.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">2. Context-Aware Personalization & Customer History Lookup</h2>
        <p>Generic responses kill sales. When a customer returns to interact with our system, the AI agent inspects their prior conversation history, previous purchase inquiries, and specific interest zones. If a client previously expressed interest in operations optimization, all subsequent messaging highlights operational SLA gains and process efficiency.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">3. Automated Content Generation & Multi-Channel Campaigns</h2>
        <p>Maintaining brand visibility requires consistent content. We build automated pipelines that generate market-aligned social media content, schedule multi-channel distribution, and run targeted follow-up campaigns automatically based on prospect engagement signals.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">4. Executive Decision Support & Operational Insights</h2>
        <p>Automation isn't just execution—it is intelligence. Every lead interaction, conversion milestone, and operational bottleneck flows into clean executive dashboards. Business owners gain clear, data-backed insights to make confident strategic decisions.</p>

        <p class="mt-8 text-lg font-semibold">By combining operational rigor, sales strategy, and agentic AI pipelines, businesses eliminate manual bottlenecks and operate smoothly 24 hours a day, 7 days a week.</p>
      </div>`,
      tags: ["Agentic AI", "AI Automation", "24/7 Support", "Lead Conversion", "Business Efficiency", "Decision Support"]
    },
    {
      id: 2,
      slug: "building-24-7-context-aware-sales-support-agents",
      title: "Building 24/7 Context-Aware Sales & Support Agents: A Business Owner's Guide to Converting After-Hours Leads",
      date: "Jan 20, 2026",
      readTime: "5 min read",
      category: "AI & Automation",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
      description: "How businesses are using context-aware AI agents to answer complex customer inquiries, inspect past interaction history, and convert after-hours leads into qualified pipeline revenue.",
      link: "/blog/building-24-7-context-aware-sales-support-agents",
      content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold mt-8 mb-4">The After-Hours Lead Leakage Problem</h2>
        <p>Over 40% of B2B and high-ticket B2C inquiries happen outside standard 9-to-5 business hours. When prospects leave a message on Friday evening and don't hear back until Monday morning, over 70% have already moved on to a competitor.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">How Context Memory Changes the Conversation</h2>
        <p>Unlike rigid decision trees, context-aware AI agents remember who they are talking to. By querying CRM records and interaction history before replying, the agent greets returning visitors with personalized knowledge, recalling their interest zones and past questions.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Converting Inquiries into Pipeline Revenue</h2>
        <p>An agentic support system doesn't just provide static answers—it actively qualifies lead intent, checks team calendar availability, and schedules sales meetings automatically in real time.</p>
      </div>`,
      tags: ["24/7 Support", "Lead Conversion", "CRM Intelligence", "AI Agents"]
    },
    {
      id: 3,
      slug: "automating-multi-channel-content-campaigns",
      title: "Automating Multi-Channel Content & Social Media Campaigns Without Losing Brand Authenticity",
      date: "Jan 10, 2026",
      readTime: "5 min read",
      category: "Marketing & Growth",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
      description: "A practical guide to building automated social media generation pipelines and multi-channel campaign triggers that keep your brand visible and engage prospects automatically.",
      link: "/blog/automating-multi-channel-content-campaigns",
      content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold mt-8 mb-4">The Content Consistency Trap</h2>
        <p>Maintaining an active brand presence across LinkedIn, Twitter, Meta, and email newsletters consumes dozens of manual hours every week. Without automated workflows, marketing teams struggle to maintain consistent posting schedules.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Building an Automated Campaign Pipeline</h2>
        <p>Using automated webhook pipelines, core business insights are converted into platform-ready posts, queued for human review or automatic publishing, and tracked for prospect click-through signals.</p>
      </div>`,
      tags: ["Content Automation", "Social Media", "Multi-Channel", "Marketing Automation"]
    },
    {
      id: 4,
      slug: "seo-cheat-sheet-2025",
      title: "The Ultimate SEO Cheat Sheet: How to Rank on Google and AI Search in 2026",
      date: "Dec 2, 2025",
      readTime: "4 min read",
      category: "SEO & Marketing",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop",
      description: "A comprehensive guide to SEO best practices for 2026, covering technical SEO, content optimization, and strategies for appearing in AI search results.",
      link: "/blog/seo-cheat-sheet-2025",
      content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold mt-8 mb-4">Introduction</h2>
        <p>Search Engine Optimization continues to evolve rapidly in 2026. With AI-powered search engines like ChatGPT, Google's AI Overviews, and voice assistants becoming mainstream, your SEO strategy must adapt.</p>
      </div>`,
      tags: ["SEO", "AI", "Marketing"]
    },
    {
      id: 5,
      slug: "data-driven-operations",
      title: "Data-Driven Decision Making in Operations",
      date: "Dec 5, 2025",
      readTime: "8 min read",
      category: "Data Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      description: "How leveraging data analytics can transform operational efficiency and drive better business outcomes, with insights from managing 551+ banking outlets.",
      link: "/blog/data-driven-operations",
      content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold mt-8 mb-4">The Power of Data in Operations</h2>
        <p>In today's complex business environment, making informed decisions based on solid analytics is essential.</p>
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
      description: "Leading enterprise sales and designing 24/7 cross-departmental AI automation workflows. Building context-aware lead conversion agents, automated marketing campaign pipelines, and streamlining sales-to-operations handoffs to maximize business efficiency and revenue growth.",
      tags: ["Agentic AI", "24/7 Support", "Lead Conversion", "Sales Leadership", "Business Process Automation"]
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
      { name: '24/7 Agentic AI & Support Agents', level: 'expert', icon: 'Settings' },
      { name: 'Lead Conversion & Auto Campaigns', level: 'expert', icon: 'Target' },
      { name: 'Context-Aware History Intelligence', level: 'expert', icon: 'Users' },
      { name: 'Automated Social Media Content Gen', level: 'advanced', icon: 'MessageSquare' },
      { name: 'Process & SLA Engineering', level: 'expert', icon: 'Code' },
      { name: 'Power BI Dashboarding & Analytics', level: 'advanced', icon: 'BarChart' },
      { name: 'Python, VBA, REST Webhooks', level: 'advanced', icon: 'Code' },
    ],
    professional: [
      { name: 'Cross-Departmental Efficiency', level: 'expert', icon: 'Crosshair' },
      { name: 'Data-Backed Decision Support', level: 'expert', icon: 'Target' },
      { name: 'Sales & Revenue Growth Strategy', level: 'advanced', icon: 'Users' },
      { name: 'Customer & Stakeholder Relations', level: 'expert', icon: 'Handshake' },
      { name: 'Project Management', level: 'advanced', icon: 'ClipboardList' },
      { name: 'Strategic Business Execution', level: 'expert', icon: 'MessageSquare' },
    ]
  },
  certifications: [
    { title: 'Email & Marketing Automation Certificate', issuer: 'HubSpot Academy', icon: 'Award' },
    { title: 'Advanced MS Office & Data Certificate', issuer: 'Udemy', icon: 'Laptop' },
    { title: 'Professional Business Communication', issuer: 'Udemy', icon: 'MessageCircle' },
    { title: 'Best Presenter Award', issuer: 'Research on "The Future of E-Commerce in Bangladesh"', icon: 'Trophy' },
  ]
};