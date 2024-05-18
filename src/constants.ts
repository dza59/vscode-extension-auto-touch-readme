import { TemplateDataType } from './types';
import * as path from 'path';

export const templateData: TemplateDataType = {
  projectName: 'Project Name',
  gitUrl: '',
  description: 'An example project',
  technologyStack: ['Node.js', 'Express', 'MongoDB'],
  screenshots: [],
  steps: 'Run `npm install` to install dependencies',
};

export const templatePaths: { [key: string]: string } = {
  aboutPath: path.join(__dirname, '..', 'templates', 'about.md'),
  techStackPath: path.join(__dirname, '..', 'templates', 'stack.md'),
  preReqsPath: path.join(__dirname, '..', 'templates', 'preReqs.md'),
  screenshotsPath: path.join(__dirname, '..', 'templates', 'screenshots.md'),
  startPath: path.join(__dirname, '..', 'templates', 'start.md'),
  usagePath: path.join(__dirname, '..', 'templates', 'usage.md'),
  endPath: path.join(__dirname, '..', 'templates', 'end.md'),
};
