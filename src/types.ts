export interface TemplateDataType {
  projectName: string;
  gitUrl: string;
  description: string;
  technologyStack: string[];
  screenshots: { altText: string; label: string; path: string }[]; // Updated to expect the correct structure
  steps: string;
}
