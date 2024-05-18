import { TemplateDataType } from './types';
import * as path from 'path';
import { ProjectIndicators, ProjectType } from './types';

// maintain dynamic varibles that will be placed in handlebars templates
export const templateData: TemplateDataType = {
  projectName: 'Project Name',
  gitUrl: '',
  description: 'An example project',
  technologyStack: [],
  screenshots: [],
  steps: '',
};

// mapping paths to various Handlebars templates
export const templatePaths: { [key: string]: string } = {
  aboutPath: path.join(__dirname, '..', 'templates', 'about.md'),
  techStackPath: path.join(__dirname, '..', 'templates', 'stack.md'),
  preReqsPath: path.join(__dirname, '..', 'templates', 'preReqs.md'),
  screenshotsPath: path.join(__dirname, '..', 'templates', 'screenshots.md'),
  startPath: path.join(__dirname, '..', 'templates', 'start.md'),
  usagePath: path.join(__dirname, '..', 'templates', 'usage.md'),
  endPath: path.join(__dirname, '..', 'templates', 'end.md'),
};

// map project type to its indicators - commonly used filename(s)
export const projectIndicators: ProjectIndicators = {
  node: ['package.json'],
  python: ['requirements.txt', 'Pipfile'],
  ruby: ['Gemfile'],
  php: ['composer.json'],
  java: ['pom.xml'],
  dotnet: ['.csproj', '.sln'],
  rust: ['Cargo.toml'],
  golang: ['go.mod'],
};

// maintain current prject type and its indicator files found in the workspace
export const projectType: ProjectType = {
  type: '',
  indicators: [],
};
