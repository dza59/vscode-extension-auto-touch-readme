export interface TemplateDataType {
  projectName: string;
  gitUrl: string;
  description: string;
  technologyStack: string[];
  screenshots: { altText: string; label: string; path: string }[];
  steps: string;
}

export interface ProjectIndicators {
  [key: string]: string[];
  node: string[];
  python: string[];
  ruby: string[];
  php: string[];
  java: string[];
  dotnet: string[];
  rust: string[];
  golang: string[];
}

export interface ProjectType {
  type: string;
  indicators: string[];
}
