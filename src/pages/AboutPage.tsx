import Container from '../components/common/Container';
import { profile } from '../data/profile';

const AboutPage = () => {
  const { personal, education, certifications, memberships } = profile;

  return (
    <div className="py-16 md:py-24">
      <Container size="md">
        <div className="flex flex-col gap-16">
          {/* ── Who I Am ── */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
              Who I Am
            </h1>
            <div className="flex flex-col gap-4 text-sm text-neutral-600 leading-relaxed max-w-xl">
              <p>
                I'm a project manager and operations professional based in{' '}
                {personal.location}, with a background that spans engineering,
                web development, and team coordination. I started my career as a
                geotechnical engineer, moved into software as a web developer,
                and eventually found my footing leading people and processes as
                an IT projects and operations manager.
              </p>
              <p>
                That path across disciplines is what makes me effective — I
                understand both the technical and the human side of building
                things. I'm comfortable in a sprint planning session, a client
                call, or a procurement negotiation.
              </p>
              <p>
                Outside of work, I'm a certified English instructor, a published
                researcher in environmental GIS analysis, and an associate
                member of the Institute of Engineers Sri Lanka.
              </p>
            </div>
          </div>

          {/* ── Education ── */}
          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Education
            </p>
            <div className="flex flex-col gap-5">
              {education.map(edu => (
                <div key={edu.degree} className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-black leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-neutral-500">{edu.institution}</p>
                  <p className="text-xs text-neutral-400">{edu.period}</p>
                  {edu.details && (
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Certifications ── */}
          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Certifications
            </p>
            <div className="flex flex-col divide-y divide-neutral-100">
              {certifications.map(cert => (
                <div
                  key={cert.title}
                  className="py-3 first:pt-0 last:pb-0 flex flex-col gap-0.5"
                >
                  <p className="text-sm font-medium text-black leading-snug">
                    {cert.title}
                  </p>
                  <p className="text-xs text-neutral-400">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Memberships ── */}
          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Memberships
            </p>
            <div className="flex flex-col gap-3">
              {memberships.map(m => (
                <div
                  key={m}
                  className="flex gap-3 items-start text-sm text-neutral-600"
                >
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
