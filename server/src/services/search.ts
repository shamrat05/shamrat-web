import { knowledgeBase } from '../data/knowledge';

export class SearchService {
  /**
   * Searches the knowledge base for relevant context based on user query.
   * Returns a concise string of relevant chunks.
   */
  static findRelevantContext(query: string): string {
    const tokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
    const findings: string[] = [];

    // Helper to check relevance
    const isRelevant = (text: string) => tokens.some(token => text.toLowerCase().includes(token));

    // 1. Profile & Contact (High Priority)
    if (isRelevant("contact") || isRelevant("email") || isRelevant("phone") || isRelevant("linkedin")) {
      findings.push(`**Contact Info:** Email: ${knowledgeBase.profile.contact.email}, Phone: ${knowledgeBase.profile.contact.phone}, LinkedIn: ${knowledgeBase.profile.contact.linkedin}`);
    }
    
    // 2. Education (Specific check for university/degree)
    if (isRelevant("university") || isRelevant("college") || isRelevant("education") || isRelevant("degree") || isRelevant("mba") || isRelevant("bba")) {
      knowledgeBase.education.forEach(edu => {
        findings.push(`**Education:** ${edu.degree} from ${edu.institution}. ${edu.details}`);
      });
    }

    // 3. Experience
    if (isRelevant("experience") || isRelevant("work") || isRelevant("job") || isRelevant("career") || isRelevant("doer") || isRelevant("kiam") || isRelevant("bank")) {
      knowledgeBase.experience.forEach(exp => {
        if (isRelevant(exp.company) || isRelevant(exp.role) || isRelevant("experience")) {
           findings.push(`**Experience:** ${exp.role} at ${exp.company} (${exp.period}). Highlights: ${exp.highlights.join(", ")}`);
        }
      });
    }

    // 4. Skills
    if (isRelevant("skill") || isRelevant("tech") || isRelevant("tool") || isRelevant("software")) {
      findings.push(`**Technical Skills:** ${knowledgeBase.skills.technical.join(", ")}`);
      findings.push(`**Professional Skills:** ${knowledgeBase.skills.professional.join(", ")}`);
    } else {
        // Granular Skill Check
        const techMatches = knowledgeBase.skills.technical.filter(s => isRelevant(s));
        if (techMatches.length > 0) findings.push(`**Relevant Technical Skills:** ${techMatches.join(", ")}`);
    }

    // 5. Projects
    if (isRelevant("project") || isRelevant("portfolio") || isRelevant("case")) {
       knowledgeBase.projects.forEach(p => {
           if (isRelevant(p.title) || isRelevant(p.description) || isRelevant("project")) {
               findings.push(`**Project:** ${p.title} - ${p.description}`);
           }
       });
    }

    // Default Fallback: If no specific tokens match deep categories but query is about "Shamrat", return summary.
    if (findings.length === 0 && (isRelevant("who") || isRelevant("about"))) {
        findings.push(`**Summary:** ${knowledgeBase.profile.summary}`);
    }

    return findings.join("\n\n");
  }
}
