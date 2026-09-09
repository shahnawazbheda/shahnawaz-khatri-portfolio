export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  shortSummary?: string;
  image: string;
  tech: string[];
  category?: string;
  github: string;
  demo: string;
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  color: string;
  iconName: string;
}

export interface SocialItem {
  name: string;
  href: string;
  color: string;
}

export interface ConceptItem {
  text: string;
  imgPath: string;
}

