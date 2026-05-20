import { useState } from 'react';
import Container from '../components/common/Container';
import { profile } from '../data/profile';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

const ContactPage = () => {
  const { personal } = profile;

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const next: Partial<typeof form> = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Enter a valid email.';
    if (!form.message.trim()) next.message = 'Message is required.';
    return next;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof form]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setFormState('sending');
    await new Promise(r => setTimeout(r, 1200));
    setFormState('sent');
  };

  const subjectOptions = [
    'Project Management Role',
    'Operations Opportunity',
    'Freelance / Contract Work',
    'Collaboration',
    'Other',
  ];

  const contactMethods = [
    {
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      description: 'Best for detailed enquiries.',
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone?.replace(/\s/g, '')}`,
      description: 'Available during business hours.',
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: 'anushika-nayomi',
      href: personal.social.find(s => s.label === 'LinkedIn')?.url ?? '#',
      description: 'Connect professionally.',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <Container size="md">
        <div className="flex flex-col gap-16">
          {/* ── Header ── */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Get in touch
            </h1>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-lg">
              Open to project management, operations, and coordination
              opportunities. Drop a message and I'll get back to you within 24
              hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
            {/* ── Form ── */}
            <div>
              {formState === 'sent' ? (
                <div className="flex flex-col gap-4 py-10 border border-neutral-800 rounded-lg px-8">
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-white">
                      Message sent
                    </p>
                    <p className="text-sm text-neutral-500">
                      Thanks, {form.name.split(' ')[0]}. I'll be in touch soon.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setForm({
                        name: '',
                        email: '',
                        subject: '',
                        message: '',
                      });
                      setFormState('idle');
                    }}
                    className="self-start text-xs text-neutral-500 underline underline-offset-2 hover:text-white transition-colors mt-1"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Name" error={errors.name}>
                      <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Anushika Nayomi"
                        className={inputClass(!!errors.name)}
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={inputClass(!!errors.email)}
                      />
                    </Field>
                  </div>

                  {/* Subject */}
                  <Field label="Subject" hint="Optional">
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`${inputClass(false)} text-neutral-400 appearance-none`}
                    >
                      <option value="">Select a topic…</option>
                      {subjectOptions.map(o => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {/* Message */}
                  <Field label="Message" error={errors.message}>
                    <textarea
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about the role, project, or just say hello…"
                      className={`${inputClass(!!errors.message)} resize-none`}
                    />
                  </Field>

                  <div className="flex items-center gap-4 pt-1">
                    <button
                      type="submit"
                      disabled={formState === 'sending'}
                      className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formState === 'sending' ? 'Sending…' : 'Send message'}
                    </button>
                    {formState === 'error' && (
                      <p className="text-xs text-red-500">
                        Something went wrong. Try again.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="flex flex-col gap-10">
              {/* Contact methods */}
              <div className="flex flex-col gap-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                  Contact
                </p>
                <div className="flex flex-col divide-y divide-neutral-800">
                  {contactMethods.map(m => (
                    <a
                      key={m.label}
                      href={m.href}
                      target={m.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="group py-4 first:pt-0 last:pb-0 flex flex-col gap-1"
                    >
                      <span className="flex items-center gap-2 text-xs font-medium text-neutral-400 uppercase tracking-widest">
                        {m.icon}
                        {m.label}
                      </span>
                      <span className="text-sm font-medium text-white group-hover:underline underline-offset-2 transition-colors">
                        {m.value}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {m.description}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                  Availability
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <p className="text-sm text-neutral-400">
                      Open to full-time roles
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0" />
                    <p className="text-sm text-neutral-400">
                      Freelance / contract work
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0" />
                    <p className="text-sm text-neutral-400">
                      Based in {personal.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const inputClass = (hasError: boolean) =>
  `w-full px-3 py-2.5 text-sm text-white bg-neutral-900 border rounded-md outline-none transition-colors placeholder:text-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
    hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-neutral-700'
  }`;

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

const Field = ({ label, hint, error, children }: FieldProps) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center gap-2">
      <label className="text-xs font-medium text-white">{label}</label>
      {hint && <span className="text-xs text-neutral-400">{hint}</span>}
    </div>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export default ContactPage;
