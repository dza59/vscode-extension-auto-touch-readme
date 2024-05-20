import * as path from 'path';
import {
  ProjectIndicators,
  ProjectType,
  TechStack,
  TemplateDataType,
} from './types';

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

export const commonTechStack: TechStack = {
  node: 'https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=fff',
  react:
    'https://img.shields.io/badge/react-61dafb?style=for-the-badge&logo=react&logoColor=000',
  'react-native':
    'https://img.shields.io/badge/react_native-61dafb?style=for-the-badge&logo=react&logoColor=000',
  expo: 'https://img.shields.io/badge/expo-000020?style=for-the-badge&logo=expo&logoColor=fff',
  firebase:
    'https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34',
  supabase:
    'https://img.shields.io/badge/supabase-000000?style=for-the-badge&logo=supabase&logoColor=ffffff',
  nativewind:
    'https://img.shields.io/badge/nativewind-000000?style=for-the-badge&logo=nativewind&logoColor=ffffff',
  tailwindcss:
    'https://img.shields.io/badge/tailwind_css-38b2ac?style=for-the-badge&logo=tailwind-css&logoColor=fff',
  mui: 'https://img.shields.io/badge/material_ui-0081cb?style=for-the-badge&logo=material-ui&logoColor=fff',
  typescript:
    'https://img.shields.io/badge/typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=fff',
  next: 'https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=ffffff',
  express:
    'https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=ffffff',
  mongoose:
    'https://img.shields.io/badge/mongoose-47a248?style=for-the-badge&logo=mongoose&logoColor=fff',
  prisma:
    'https://img.shields.io/badge/prisma-2d3748?style=for-the-badge&logo=prisma&logoColor=fff',
  vite: 'https://img.shields.io/badge/vite-646c72?style=for-the-badge&logo=vite&logoColor=fff',
  jest: 'https://img.shields.io/badge/jest-c21325?style=for-the-badge&logo=jest&logoColor=fff',
  cypress:
    'https://img.shields.io/badge/cypress-17202c?style=for-the-badge&logo=cypress&logoColor=fff',
  socket:
    'https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=ffffff',
  vue: 'https://img.shields.io/badge/vue-4fc08d?style=for-the-badge&logo=vue.js&logoColor=fff',
  vuetify:
    'https://img.shields.io/badge/vuetify-1867c0?style=for-the-badge&logo=vuetify&logoColor=fff',
  eslint:
    'https://img.shields.io/badge/eslint-4b32c3?style=for-the-badge&logo=eslint&logoColor=fff',
  serverless:
    'https://img.shields.io/badge/serverless-fd5750?style=for-the-badge&logo=serverless&logoColor=fff',
  graphql:
    'https://img.shields.io/badge/graphql-e10098?style=for-the-badge&logo=graphql&logoColor=fff',
  mongodb:
    'https://img.shields.io/badge/MongoDB-47a248?style=for-the-badge&logo=mongodb&logoColor=fff',
  aws: 'https://img.shields.io/badge/aws-232f3e?style=for-the-badge&logo=amazon-aws&logoColor=fff',
  bootstrap:
    'https://img.shields.io/badge/bootstrap-7952b3?style=for-the-badge&logo=bootstrap&logoColor=fff',
  fastapi:
    'https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=fff',
  ionic:
    'https://img.shields.io/badge/Ionic-3880ff?style=for-the-badge&logo=ionic&logoColor=fff',
  nestjs:
    'https://img.shields.io/badge/NestJS-e0234e?style=for-the-badge&logo=nestjs&logoColor=fff',
  nodemon:
    'https://img.shields.io/badge/Nodemon-76d04b?style=for-the-badge&logo=nodemon&logoColor=fff',
  three:
    'https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=ffffff',
  postgresql:
    'https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=fff',
  shopify:
    'https://img.shields.io/badge/Shopify-96bf48?style=for-the-badge&logo=shopify&logoColor=fff',
};
