import type { Education, Certification } from '../../types';

interface EducationCertsProps {
  education: Education[];
  certifications: Certification[];
}

const EducationCerts = ({ education, certifications }: EducationCertsProps) => {
  return (
    <section className="py-16 border-b border-neutral-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Education */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6 text-center">
            Education
          </h2>
          <div className="flex flex-col gap-5">
            {education.map((edu) => (
              <div key={edu.degree} className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-black leading-snug">{edu.degree}</h3>
                <p className="text-sm text-neutral-500">{edu.institution}</p>
                <p className="text-xs text-neutral-400">{edu.period}</p>
                {edu.details && (
                  <p className="text-xs text-neutral-400 mt-0.5">{edu.details}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6 text-center">
            Certifications
          </h2>
          <div className="flex flex-col divide-y divide-neutral-100">
            {certifications.map((cert) => (
              <div key={cert.title} className="py-3 first:pt-0 last:pb-0 flex flex-col gap-0.5">
                <p className="text-sm font-medium text-black leading-snug">{cert.title}</p>
                <p className="text-xs text-neutral-400">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationCerts;
