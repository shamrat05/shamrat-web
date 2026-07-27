import React from 'react';

interface Skill {
  name: string;
  abbr: string;
  color: string;
}

const row1Skills: Skill[] = [
  { name: 'Marketing Strategy', abbr: 'MS', color: '#3B82F6' },
  { name: 'Data Analytics', abbr: 'DA', color: '#10B981' },
  { name: 'AI & Automation', abbr: 'AI', color: '#8B5CF6' },
  { name: 'Sales Operations', abbr: 'SO', color: '#F59E0B' },
  { name: 'CRM Systems', abbr: 'CR', color: '#06B6D4' },
  { name: 'SEO & SEM', abbr: 'SE', color: '#10B981' },
  { name: 'Funnel Optimization', abbr: 'FO', color: '#EC4899' },
  { name: 'React & TypeScript', abbr: 'RT', color: '#3B82F6' },
];

const row2Skills: Skill[] = [
  { name: 'Business Intelligence', abbr: 'BI', color: '#F59E0B' },
  { name: 'Project Management', abbr: 'PM', color: '#10B981' },
  { name: 'Growth Hacking', abbr: 'GH', color: '#EC4899' },
  { name: 'Python & ML', abbr: 'PY', color: '#8B5CF6' },
  { name: 'A/B Testing', abbr: 'AB', color: '#06B6D4' },
  { name: 'Email Marketing', abbr: 'EM', color: '#F97316' },
  { name: 'Revenue Operations', abbr: 'RO', color: '#3B82F6' },
  { name: 'PostgreSQL & MongoDB', abbr: 'DB', color: '#10B981' },
];

const Chip: React.FC<{ skill: Skill }> = ({ skill }) => (
  <span
    className="tm-chip"
    style={{ '--c': skill.color } as React.CSSProperties}
  >
    <span className="tm-tile">{skill.abbr}</span>
    {skill.name}
  </span>
);

const Rail: React.FC<{ skills: Skill[]; speed: string; reverse?: boolean }> = ({
  skills,
  speed,
  reverse,
}) => {
  const group = (
    <div
      className={`tm-group ${reverse ? 'tm-group--rev' : ''}`}
      style={{ '--speed': speed } as React.CSSProperties}
    >
      {skills.map((s, i) => (
        <Chip key={`a-${i}`} skill={s} />
      ))}
    </div>
  );
  const groupDupe = (
    <div
      className={`tm-group ${reverse ? 'tm-group--rev' : ''}`}
      style={{ '--speed': speed } as React.CSSProperties}
      aria-hidden="true"
    >
      {skills.map((s, i) => (
        <Chip key={`b-${i}`} skill={s} />
      ))}
    </div>
  );

  return (
    <div className="tm-viewport">
      {group}
      {groupDupe}
    </div>
  );
};

export const TechMarquee: React.FC = () => {
  const allSkills = [...row1Skills, ...row2Skills];

  return (
    <section className="tm-section" aria-label="Skills marquee">
      {/* SR-only static list for a11y */}
      <ul className="sr-only">
        {allSkills.map((s) => (
          <li key={s.name}>{s.name}</li>
        ))}
      </ul>

      <div className="tm-inner">
        <div className="tm-head">
          <h3 className="tm-title">What I work with</h3>
        </div>

        <div className="tm-wall">
          <Rail skills={row1Skills} speed="32s" />
          <Rail skills={row2Skills} speed="40s" reverse />
        </div>
      </div>
    </section>
  );
};
