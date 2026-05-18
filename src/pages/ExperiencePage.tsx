import Container from '../components/common/Container';
import { profile } from '../data/profile';
import type { CompanyProject, WorkExperience } from '../types';

const typeBadge: Record<NonNullable<WorkExperience['type']>, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  internship: 'Internship',
  contract: 'Contract',
};

const ProjectCard = ({ project }: { project: CompanyProject }) => (
  <div className="flex flex-col gap-3 border border-neutral-200 rounded-lg overflow-hidden">
    <div className="w-full h-36 bg-neutral-100 shrink-0" />
    <div className="flex flex-col gap-2 px-4 pb-4">
      <h4 className="text-sm font-semibold text-black leading-snug">
        {project.name}
      </h4>
      <p className="text-xs text-neutral-500 leading-relaxed">
        {project.description}
      </p>
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
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
  </div>
);

const ExperienceEntry = ({ job }: { job: WorkExperience }) => (
  <div className="flex flex-col gap-6 py-10 border-b border-neutral-100 last:border-0">
    {/* Company header */}
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-md bg-neutral-100 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-sm font-bold text-neutral-500">
            {job.company.charAt(0)}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-semibold text-black">{job.company}</h2>
          <p className="text-sm text-neutral-500">{job.role}</p>
          <p className="text-xs text-neutral-400">{job.location}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:flex-col sm:items-end shrink-0">
        <span className="text-xs text-neutral-400">{job.period}</span>
        {job.type && (
          <span className="text-xs text-neutral-400 border border-neutral-200 rounded px-2 py-0.5">
            {typeBadge[job.type]}
          </span>
        )}
      </div>
    </div>

    {/* Description */}
    <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
      {job.description}
    </p>

    {/* Highlights */}
    {job.highlights.length > 0 && (
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Key Contributions
        </p>
        <ul className="flex flex-col gap-2">
          {job.highlights.map((h, i) => (
            <li
              key={i}
              className="flex gap-3 items-start text-sm text-neutral-600"
            >
              <span className="mt-2 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Tools */}
    {job.tools && job.tools.length > 0 && (
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Tools & Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {job.tools.map(tool => (
            <span
              key={tool}
              className="text-xs text-neutral-500 bg-neutral-100 rounded px-2 py-0.5"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Projects */}
    {job.projects && job.projects.length > 0 && (
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Projects
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {job.projects.map(project => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    )}
  </div>
);

const ExperiencePage = () => {
  return (
    <div className="py-16 md:py-24">
      <Container size="md">
        <div className="flex flex-col gap-2 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
            Experience
          </h1>
          <p className="text-sm text-neutral-500 leading-relaxed max-w-xl">
            A look at the roles I've held, the teams I've worked with, and the
            projects I've delivered.
          </p>
        </div>

        <div className="flex flex-col">
          {profile.experience.map(job => (
            <ExperienceEntry key={`${job.company}-${job.period}`} job={job} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ExperiencePage;
