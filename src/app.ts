import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import {
  getWorkspacePath,
  getRepoUrl,
  getScreenshots,
  compileTemplate,
} from './utils';
import {
  templateData,
  templatePaths,
  projectIndicators,
  projectType,
  commonTechStack,
} from './constants';
import { Technology } from './types';

export async function getNodeProjectName(wsPath: string): Promise<string> {
  const pJsonPath = path.join(wsPath, 'package.json');

  try {
    const jsonContent = JSON.parse(
      await fs.promises.readFile(pJsonPath, 'utf8'),
    );
    const name = jsonContent.name
      .split(/[-_]/)
      .map(
        (part: string) =>
          part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
      )
      .join(' ');

    return name;
  } catch (error) {
    vscode.window.showErrorMessage('Failed to read or parse package.json: ');
    return 'no project name found';
  }
}

export async function handleNodeProject(wsPath: string) {
  // About Section: about.md
  const pJsonPath = path.join(wsPath, projectType.indicators[0]);
  const jsonContent = JSON.parse(await fs.promises.readFile(pJsonPath, 'utf8'));
  const name = jsonContent.name
    .split(/[-_]/)
    .map(
      (part: string) =>
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
    )
    .join(' ');

  templateData.projectName = name;

  //TODO:  Tech Stack Section: stack.md
  const allDependencies = {
    ...jsonContent.dependencies,
    ...jsonContent.devDependencies,
  };

  const usedTechStack: Technology[] = [];
  //this is a node project so we will add it
  usedTechStack.push({
    name: 'node',
    logo: commonTechStack['node'],
  });

  // Check each key in allDependencies against commonTechStack
  Object.keys(allDependencies).forEach((dep) => {
    const depName = dep.split('/')[0]; // removing scope if present
    if (commonTechStack.hasOwnProperty(depName)) {
      usedTechStack.push({
        name: depName,
        logo: commonTechStack[depName],
      });

      if (depName === 'express') {
        usedTechStack.push({
          name: 'postgresql',
          logo: commonTechStack['postgresql'],
        });
      }
    }
  });

  templateData.technologyStack = [...usedTechStack];

  // FOR testing
  // vscode.window.showInformationMessage(
  //   ` ${templateData.projectName}: stack: ${templateData.technologyStack} `,
  // );
}

function handlePythonProject(wsPath: string) {
  vscode.window.showErrorMessage(
    'Python project detected. Not yet implemented.',
  );
}

// this function will update the template data base on information from the workspace
async function updateTemplatesData(wsPath: string) {
  // common arrtibutes cross all project types: github url, screenshots
  const gitUrl = await getRepoUrl(wsPath);
  if (gitUrl) {
    templateData.gitUrl = gitUrl;
  }

  const screenshots = await getScreenshots(wsPath);
  if (screenshots.length > 0) {
    templateData.screenshots = screenshots;
  }

  // handle individual project type
  switch (projectType.type) {
    case 'node':
      return handleNodeProject(wsPath);
    case 'python':
      return handlePythonProject(wsPath);
    default:
      vscode.window.showInformationMessage(
        `Handling generic or unknown project`,
      );
  }
}

export async function updateProjectType(wsPath: string) {
  const files = await fs.promises.readdir(wsPath);
  let projectFound = false;

  for (let type in projectIndicators) {
    const indicators = projectIndicators[type];
    if (indicators.some((indicator) => files.includes(indicator))) {
      projectType.type = type;
      projectType.indicators = indicators.filter((indicator) =>
        files.includes(indicator),
      );
      projectFound = true;
      break;
    }
  }

  if (!projectFound) {
    projectType.type = 'unknown'; // Set type to unknown if no indicators match
    projectType.indicators = []; // Clear indicators
  }
}

export async function touchReadme() {
  const wsPath = getWorkspacePath();
  if (!wsPath) {
    return;
  }

  const readmePath = path.join(wsPath, 'README.md');

  // Steps:
  // 1. find project type
  // 2. depends on project type, update the template data
  await updateProjectType(wsPath);
  await updateTemplatesData(wsPath);

  try {
    let content = '';
    for (let key in templatePaths) {
      content +=
        (await compileTemplate(templatePaths[key], templateData)) + '\n\n';
    }

    // create or replace the README.md file
    await fs.promises.writeFile(readmePath, content);

    // after creation, open the README.md file
    const readmeDoc = await vscode.workspace.openTextDocument(readmePath);
    await vscode.window.showTextDocument(readmeDoc);
  } catch (error) {
    vscode.window.showErrorMessage('Failed to create or replace README.md: ');
  }
}
