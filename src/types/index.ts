export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email' | 'portfolio';
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  social: SocialLink[];
}

export interface FocusArea {
  title: string;
  description: string;
}

export interface CompanyProject {
  name: string;
  description: string;
  tags?: string[];
}

export interface WorkExperience {
  role: string;
  company: string;
  location: string;
  period: string;
  type?: 'full-time' | 'part-time' | 'internship' | 'contract';
  description: string;
  highlights: string[];
  tools?: string[];
  projects?: CompanyProject[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface Certification {
  title: string;
  issuer: string;
}

export interface Project {
  title: string;
  description: string;
  link?: string;
  tags?: string[];
}

export interface ProfileData {
  personal: PersonalInfo;
  focusAreas: FocusArea[];
  experience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  memberships: string[];
}
