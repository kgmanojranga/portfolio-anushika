import Container from '../components/common/Container';
import { profile } from '../data/profile';

const skillGroups = [
  {
    label: 'Project & Team',
    items: [
      'Task Coordination',
      'Reporting',
      'Delivery Tracking',
      'Process Documentation',
    ],
  },
  {
    label: 'Collaboration',
    items: ['Slack', 'Zoom', 'Notion', 'Reetro'],
  },
  {
    label: 'Productivity',
    items: ['Jira', 'Trello', 'Asana', 'Google Workspace'],
  },
  {
    label: 'AI & Research',
    items: ['ChatGPT', 'DeepSeek', 'Market Research', 'Business Analysis'],
  },
  {
    label: 'Other',
    items: ['Stakeholder Communication', 'Data Management', 'Problem Solving'],
  },
];

const alevel = {
  school: "St. Joseph's Girls' College, Kegalle",
  period: 'Aug 2016',
  results: 'Combined Maths: A · Physics: B · Chemistry: B · Z-Score: 1.6289',
};

const extracurricular = [
  'Learning Swimming — Yoshida Swimming Academy',
  'Member of University Taekwondo Team — University of Moratuwa',
  "Member of Karate Team — St. Joseph's Girls' College, Kegalle",
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-5">
    {children}
  </p>
);

const Divider = () => <div className="border-t border-neutral-100 my-10" />;

const ResumePage = () => {
  const {
    personal,
    experience,
    education,
    certifications,
    memberships,
    projects,
  } = profile;

  const handlePrint = () => window.print();

  return (
    <>
      {/* Print styles injected via a style tag */}
      <style>{`
        @media print {
          nav, footer, .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-page { padding: 0 !important; }
        }
      `}</style>

      <div className="py-16 md:py-24 print-page">
        <Container size="md">
          {/* ── Top bar: title + print action ── */}
          <div className="flex items-start justify-between gap-4 mb-12">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
                Résumé
              </h1>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-md">
                A full summary of my experience, skills, and background.
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="no-print shrink-0 flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-md text-sm font-medium text-neutral-600 hover:text-black hover:border-neutral-400 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print / Save PDF
            </button>
          </div>

          {/* ── Identity block ── */}
          <div className="flex flex-col gap-1 pb-8 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-black">
              {personal.name}
            </h2>
            <p className="text-sm text-neutral-500">{personal.tagline}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2">
              <span className="text-xs text-neutral-400">
                {personal.location}
              </span>
              <a
                href={`mailto:${personal.email}`}
                className="text-xs text-neutral-400 hover:text-black transition-colors"
              >
                {personal.email}
              </a>
              <a
                href={`tel:${personal.phone?.replace(/\s/g, '')}`}
                className="text-xs text-neutral-400 hover:text-black transition-colors"
              >
                {personal.phone}
              </a>
              {personal.social
                .filter(s => s.label !== 'Email')
                .map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-400 hover:text-black transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
            </div>
          </div>

          {/* ── Summary ── */}
          <div className="py-8 border-b border-neutral-100">
            <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
              Results-driven Projects and Operations professional with 2+ years
              of experience in the IT sector, managing delivery, aligning
              cross-functional teams, and executing initiatives in fast-paced,
              innovation-driven environments. Background spanning engineering,
              web development, and team coordination — comfortable in sprint
              planning, client calls, and procurement negotiations.
            </p>
          </div>

          {/* ── Skills ── */}
          <div className="py-10">
            <SectionLabel>Key Skills</SectionLabel>
            <div className="flex flex-col gap-3">
              {skillGroups.map(group => (
                <div
                  key={group.label}
                  className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4"
                >
                  <span className="text-xs font-medium text-black shrink-0 w-36">
                    {group.label}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {group.items.join(' · ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* ── Experience ── */}
          <div>
            <SectionLabel>Work Experience</SectionLabel>
            <div className="flex flex-col">
              {experience.map((job, i) => (
                <div
                  key={`${job.company}-${i}`}
                  className="flex flex-col gap-5 pb-10 mb-10 border-b border-neutral-100 last:border-0 last:mb-0"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-sm font-semibold text-black">
                        {job.role}
                      </h3>
                      <p className="text-xs text-neutral-500">
                        {job.company} · {job.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-neutral-400">
                        {job.period}
                      </span>
                      {job.type && (
                        <span className="text-xs text-neutral-400 border border-neutral-200 rounded px-2 py-0.5 capitalize">
                          {job.type}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Highlights */}
                  {job.highlights.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {job.highlights.map((h, j) => (
                        <li
                          key={j}
                          className="flex gap-3 items-start text-xs text-neutral-600 leading-relaxed"
                        >
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tools */}
                  {job.tools && job.tools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {job.tools.map(t => (
                        <span
                          key={t}
                          className="text-xs text-neutral-500 bg-neutral-100 rounded px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* ── Education ── */}
          <div>
            <SectionLabel>Education</SectionLabel>
            <div className="flex flex-col gap-6">
              {education.map(edu => (
                <div
                  key={edu.degree}
                  className="flex flex-col sm:flex-row sm:justify-between gap-1"
                >
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-sm font-semibold text-black">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {edu.institution}
                    </p>
                    {edu.details && (
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {edu.details}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-neutral-400 shrink-0">
                    {edu.period}
                  </span>
                </div>
              ))}
              {/* A/L */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-sm font-semibold text-black">
                    Advanced Level
                  </h3>
                  <p className="text-xs text-neutral-500">{alevel.school}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {alevel.results}
                  </p>
                </div>
                <span className="text-xs text-neutral-400 shrink-0">
                  {alevel.period}
                </span>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── Certifications ── */}
          <div>
            <SectionLabel>Courses & Certifications</SectionLabel>
            <div className="flex flex-col divide-y divide-neutral-100">
              {certifications.map(cert => (
                <div
                  key={cert.title}
                  className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5"
                >
                  <p className="text-sm font-medium text-black leading-snug">
                    {cert.title}
                  </p>
                  <p className="text-xs text-neutral-400 shrink-0">
                    {cert.issuer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* ── Projects ── */}
          <div>
            <SectionLabel>Projects</SectionLabel>
            <div className="flex flex-col gap-5">
              {projects.map(project => (
                <div key={project.title} className="flex flex-col gap-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <h3 className="text-sm font-semibold text-black leading-snug">
                      {project.title}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-neutral-400 hover:text-black underline underline-offset-2 transition-colors shrink-0"
                      >
                        IEEE Xplore ↗
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {project.description}
                  </p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs text-neutral-500 bg-neutral-100 rounded px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* ── Memberships ── */}
          <div>
            <SectionLabel>Memberships</SectionLabel>
            <div className="flex flex-col gap-2.5">
              {memberships.map(m => (
                <div
                  key={m}
                  className="flex gap-3 items-start text-xs text-neutral-600"
                >
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                  {m}
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* ── Extra-curricular ── */}
          <div>
            <SectionLabel>Extra-curricular</SectionLabel>
            <div className="flex flex-col gap-2.5">
              {extracurricular.map(item => (
                <div
                  key={item}
                  className="flex gap-3 items-start text-xs text-neutral-600"
                >
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* ── Referees ── */}
          <p className="text-xs text-neutral-400 italic">
            References available upon request.
          </p>
        </Container>
      </div>
    </>
  );
};

export default ResumePage;
