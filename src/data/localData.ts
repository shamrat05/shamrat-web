import type { CMSData } from '../types/cms';

export const localData: CMSData = {
  hero: {
    name: "Md. Shamrat Hossain",
    title: "Marketing & Operations Professional",
    description: "Results-driven marketing and operations professional with proven expertise in data analytics, stakeholder coordination, and strategic business execution in Bangladesh.",
    image: "/images/shamrat-profile.jpg"
  },
  about: {
    description: [
      "I'm Md. Shamrat Hossain, a dedicated marketing and operations professional with a strong foundation in business analytics and strategic planning. I have successfully completed my MBA in Marketing and bring hands-on experience in digital operations and stakeholder management.",
      "My professional journey spans managing complex banking operations across 551+ outlets in 62 districts of Bangladesh to developing marketing strategies for industrial companies. I excel at turning data into actionable insights and building meaningful relationships that drive business growth."
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
    linkedin: "https://linkedin.com/in/shamrat5",
    github: "https://github.com/shamrat5",
    facebook: "https://facebook.com/shamrat5",
    twitter: "https://twitter.com/shamrat5",
    location: "Azimpur, Dhaka, Bangladesh"
  },
  projects: [
    {
      id: 1,
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
      id: 2,
      slug: "email-marketing-automation",
      title: "Email Marketing Automation",
      category: "marketing",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
      description: "Designed and implemented automated email marketing campaigns using HubSpot.",
      tags: ["Email Marketing", "HubSpot", "Marketing Automation"],
      link: "/portfolio/email-marketing-automation"
    },
    {
      id: 3,
      slug: "customer-journey-analytics",
      title: "Customer Journey Analytics",
      category: "analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      description: "Analyzed customer touchpoints and service delivery across banking outlets.",
      tags: ["Customer Analytics", "Journey Mapping", "UX Research"],
      link: "/portfolio/customer-journey-analytics"
    },
    {
      id: 4,
      slug: "banking-operations-optimization",
      title: "Banking Operations Process Optimization",
      category: "operations",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
      description: "Led initiative to optimize operational workflows across 62 districts.",
      tags: ["Process Improvement", "Automation", "Stakeholder Management"],
      link: "/portfolio/banking-operations-optimization"
    },
    {
      id: 5,
      slug: "cross-functional-team-coordination",
      title: "Cross-Functional Team Coordination",
      category: "operations",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      description: "Led coordination between field teams, outlet owners, and bank stakeholders.",
      tags: ["Team Leadership", "Stakeholder Management", "Issue Resolution"],
      link: "/portfolio/cross-functional-team-coordination"
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
      slug: "seo-cheat-sheet-2025",
      title: "The Ultimate SEO Cheat Sheet: How to Rank on Google and AI Search in 2025",
      date: "Dec 2, 2025",
      readTime: "4 min read",
      category: "SEO & Marketing",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop",
      description: "A comprehensive guide to SEO best practices for 2025, covering technical SEO, content optimization, and strategies for appearing in AI search results.",
      link: "/blog/seo-cheat-sheet-2025",
      content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold mt-8 mb-4">Introduction</h2>
        <p>Search Engine Optimization continues to evolve rapidly in 2025. With AI-powered search engines like ChatGPT, Google's AI Overviews, and voice assistants becoming mainstream, your SEO strategy must adapt. This cheat sheet covers everything you need to rank on both traditional and AI search results.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">1. Technical SEO Fundamentals</h2>
        <p><strong>Core Web Vitals:</strong> Google prioritizes user experience metrics. Focus on:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>LCP (Largest Contentful Paint): Keep under 2.5 seconds</li>
          <li>FID (First Input Delay): Aim for under 100ms</li>
          <li>CLS (Cumulative Layout Shift): Maintain below 0.1</li>
        </ul>
        <p class="mt-4"><strong>Site Structure:</strong> Implement clean URL structures, mobile-first indexing, and XML sitemaps. Ensure fast loading times (target: under 3 seconds on mobile).</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">2. Content Strategy for AI Search</h2>
        <p>AI search engines prioritize:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>E-E-A-T:</strong> Experience, Expertise, Authoritativeness, Trustworthiness</li>
          <li><strong>FACTS:</strong> Factual accuracy, with citations and sources</li>
          <li><strong>Originality:</strong> Unique insights, not just regurgitated content</li>
          <li><strong>Depth:</strong> Comprehensive coverage (2,000-3,000+ words for competitive topics)</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">3. On-Page Optimization</h2>
        <p>Optimize each page element for both search engines and AI:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Title tags: Keep 50-60 characters, include primary keyword</li>
          <li>Meta descriptions: 150-160 characters with call-to-action</li>
          <li>Header tags: Use H1 (once), H2, H3 hierarchically</li>
          <li>Image alt text: Descriptive, includes keywords naturally</li>
          <li>Internal linking: Link related pages with descriptive anchor text</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">4. Backlink Strategy</h2>
        <p>Quality over quantity:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Focus on relevance: Links from industry-related sites matter more</li>
          <li>Earn mentions: Create link-worthy content</li>
          <li>Guest posting: Contribute to reputable publications</li>
          <li>Broken link building: Find and replace broken links in your niche</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">5. AI Search Optimization</h2>
        <p>New tactics for ChatGPT search and Google's AI Overviews:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Optimize for snippets: Structure content with clear answers upfront</li>
          <li>FAQ sections: AI loves structured Q&A content</li>
          <li>Schema markup: Use structured data for rich results</li>
          <li>Author authority: Build author bio and credentials</li>
          <li>Source attribution: Cite sources clearly for transparency</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">Quick Checklist</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>✓ Mobile-responsive design</li>
          <li>✓ Page speed under 3 seconds</li>
          <li>✓ Unique, original content (2000+ words)</li>
          <li>✓ Internal linking strategy</li>
          <li>✓ Schema markup implementation</li>
          <li>✓ High-quality backlinks</li>
          <li>✓ Regular content updates</li>
          <li>✓ Clear author authority</li>
        </ul>

        <p class="mt-8 text-lg font-semibold">Start implementing these strategies today and watch your rankings improve!</p>
      </div>`,
      tags: ["SEO", "AI", "Marketing"]
    },
    {
      id: 2,
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
        <p>In today's complex business environment, the ability to make informed decisions based on solid analytics is no longer optional—it's essential. Having managed operations across 551+ banking outlets, I've seen firsthand how data transforms operational efficiency and drives bottom-line results.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">1. Key Performance Indicators (KPIs)</h2>
        <p>First, establish the right metrics:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Financial KPIs:</strong> Revenue per outlet, operational costs, ROI</li>
          <li><strong>Operational KPIs:</strong> Processing time, transaction volume, system uptime</li>
          <li><strong>Customer KPIs:</strong> Satisfaction scores, complaint resolution time, retention rate</li>
          <li><strong>Team KPIs:</strong> Productivity metrics, training completion, compliance adherence</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">2. Data Collection & Integration</h2>
        <p>Implement systems to capture data automatically:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>POS systems for transaction tracking</li>
          <li>CRM platforms for customer interactions</li>
          <li>Time tracking for resource allocation</li>
          <li>Centralized dashboards for real-time visibility</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">3. Real-World Impact: 551+ Outlets Case Study</h2>
        <p>When we implemented Power BI dashboards across all outlets, we discovered:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Geographic performance variation: Outlets in 5 districts were underperforming by 30%</li>
          <li>Time-based patterns: Peak transaction times helped with staffing optimization</li>
          <li>Customer segmentation: Identified high-value customers for targeted services</li>
          <li>Operational bottlenecks: Reduced processing time by 25% through workflow optimization</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">4. Predictive Analytics</h2>
        <p>Move beyond historical analysis to predictive insights:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Forecast seasonal trends and adjust inventory accordingly</li>
          <li>Predict customer churn before it happens</li>
          <li>Identify risk areas before they become critical</li>
          <li>Optimize staffing levels based on demand forecasts</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">5. Implementation Best Practices</h2>
        <p><strong>Start Small:</strong> Don't try to track everything. Focus on 5-7 critical KPIs first.</p>
        <p><strong>Visualize Clearly:</strong> Use dashboards that tell a story. Red/yellow/green indicators help quick decision-making.</p>
        <p><strong>Automate Reporting:</strong> Save hours on manual reporting with automated data pipelines.</p>
        <p><strong>Train Your Team:</strong> Data is only valuable if people understand and use it.</p>
        <p><strong>Act on Insights:</strong> The biggest mistake is analyzing but not acting. Every insight should lead to action.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Tools That Work</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Power BI:</strong> Best for large-scale operations</li>
          <li><strong>Google Analytics:</strong> Essential for web and customer data</li>
          <li><strong>Excel/Google Sheets:</strong> Quick analysis for operational teams</li>
          <li><strong>Tableau:</strong> Advanced visualization for complex datasets</li>
        </ul>

        <p class="mt-8 text-lg font-semibold">Remember: Data drives decisions, but insight drives results. The difference between good and great operations is acting on what your data reveals.</p>
      </div>`,
      tags: ["Data Analytics", "Operations", "Business Intelligence"]
    },
    {
      id: 3,
      slug: "future-digital-banking-bangladesh",
      title: "The Future of Digital Banking in Bangladesh",
      date: "Dec 8, 2025",
      readTime: "7 min read",
      category: "Digital Transformation",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=400&fit=crop",
      description: "Exploring how digital transformation is reshaping the banking landscape in Bangladesh, and what it means for traditional banking operations and customer experience.",
      link: "/blog/future-digital-banking-bangladesh",
      content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold mt-8 mb-4">The Digital Banking Revolution</h2>
        <p>Digital transformation is revolutionizing the banking sector worldwide, and Bangladesh stands at a critical inflection point. With over 170 million people and a growing tech-savvy population, Bangladesh has enormous potential for digital banking adoption. The question isn't if digital banking will dominate—it's how fast it will happen.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">1. Mobile Banking Adoption</h2>
        <p>Mobile banking has become the gateway to financial inclusion in Bangladesh:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Existing Leaders:</strong> bKash, Nagad, and Rocket have transformed remittance and micro-payment markets</li>
          <li><strong>Bank Integration:</strong> Traditional banks launching mobile apps with enhanced features</li>
          <li><strong>Agent Banking:</strong> Over 4,000 agent banking outlets expanding access beyond branches</li>
          <li><strong>Penetration Growth:</strong> Expected to reach 80%+ in urban areas by 2026</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">2. AI and Automation</h2>
        <p>Artificial intelligence is reshaping customer service and operations:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Chatbots:</strong> 24/7 customer service in Bengali language</li>
          <li><strong>Fraud Detection:</strong> AI models identifying suspicious transactions in real-time</li>
          <li><strong>Credit Scoring:</strong> Alternative data sources improving access for underserved populations</li>
          <li><strong>Personalization:</strong> AI-driven product recommendations and personalized offers</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">3. Blockchain & FinTech</h2>
        <p>Emerging technologies creating new opportunities:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Cryptocurrencies:</strong> While controversial, blockchain technology offers innovation potential</li>
          <li><strong>Smart Contracts:</strong> Automating complex banking processes</li>
          <li><strong>Decentralized Finance:</strong> Creating alternative financial services</li>
          <li><strong>Interoperability:</strong> Standards allowing seamless payments across platforms</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">4. Open Banking & APIs</h2>
        <p>The shift toward open banking ecosystems:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Third-party developers building services on bank APIs</li>
          <li>Fintech startups offering specialized financial services</li>
          <li>Integration between banks, retailers, and service providers</li>
          <li>Reduced barriers to entry for new financial services</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">5. Regulatory Framework</h2>
        <p>Bangladesh Bank is proactively shaping digital banking:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Digital Only Bank licenses enabling new entrants</li>
          <li>Updated Know Your Customer (KYC) guidelines for digital onboarding</li>
          <li>Cybersecurity and data protection standards</li>
          <li>Consumer protection frameworks for digital transactions</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">6. Challenges & Opportunities</h2>
        <p><strong>Challenges:</strong></p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Digital literacy gaps in rural areas</li>
          <li>Cybersecurity threats and data breaches</li>
          <li>Infrastructure limitations in remote regions</li>
          <li>Regulatory uncertainty for new technologies</li>
        </ul>
        <p class="mt-4"><strong>Opportunities:</strong></p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Financial inclusion for 1.5 billion unbanked adults</li>
          <li>New revenue streams through digital services</li>
          <li>Cost reduction through automation</li>
          <li>Competitive advantages for early adopters</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">What This Means for Operations</h2>
        <p>As operations professionals managing banking networks, digital transformation requires:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Rapid adaptation to new technologies</li>
          <li>Staff training and upskilling programs</li>
          <li>Process redesign for digital workflows</li>
          <li>Change management across distributed teams</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>
        <p>Digital banking in Bangladesh isn't a future possibility—it's happening now. Banks that embrace this transformation will capture new markets, reduce costs, and improve customer experiences. Those that resist will struggle to compete. The question isn't whether to go digital, but how quickly you can adapt.</p>

        <p class="mt-8 text-lg font-semibold">The future of banking is digital, customer-centric, and data-driven. Are you ready?</p>
      </div>`,
      tags: ["Digital Banking", "FinTech", "Digital Transformation"]
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