export interface ExperiencePeriod {
  start: string;
  end: string | null;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: ExperiencePeriod;
  current: boolean;
  responsibilities: string[];
  technologies: string[];
}

export interface ExperiencesData {
  experiences: Experience[];
  lastUpdated: string;
}
