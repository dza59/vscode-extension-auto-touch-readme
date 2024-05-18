import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as vscode from 'vscode';
import { templateData } from './constants';

const templatePaths: { [key: string]: string } = {
  aboutPath: path.join(__dirname, '..', 'templates', 'about.md'),
  techStackPath: path.join(__dirname, '..', 'templates', 'stack.md'),
  preReqsPath: path.join(__dirname, '..', 'templates', 'preReqs.md'),
  startPath: path.join(__dirname, '..', 'templates', 'start.md'),
  usagePath: path.join(__dirname, '..', 'templates', 'usage.md'),
  endPath: path.join(__dirname, '..', 'templates', 'end.md'),
};

export function getWorkspacePath(): string | null {
  const wsFolders = vscode.workspace.workspaceFolders;
  if (wsFolders && wsFolders.length > 0) {
    return wsFolders[0].uri.fsPath;
  }
  vscode.window.showErrorMessage('No workspace is open.');
  return null;
}

export async function isFileExists(
  wsPath: string,
  fileName: string,
): Promise<boolean> {
  const filePath = path.join(wsPath, fileName);
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function compileTemplate(filePath: string, data: any) {
  const content = await fs.promises.readFile(filePath, 'utf8');
  return Handlebars.compile(content)(data);
}

export async function getProjectName(wsPath: string): Promise<string> {
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

async function updateTemplates(wsPath: string) {
  const pJsonFile = await isFileExists(wsPath, 'package.json');
  if (pJsonFile) {
    // Update About section
    const projectName = await getProjectName(wsPath);
    if (projectName) {
      templateData.projectName = projectName;
    }

    vscode.window.showInformationMessage(
      `Project name updated: ${projectName}`,
    );

    // TODO: update screenshots if there exist a screenshots folder

    // TODO: update the technologyStack array with the dependencies from package.json

    // TODO: update the pre-requisites section based on the tech stack

    // TODO: update the quick start section (install, usage) base on tech stack

    // TODO: update API if there is API/APIs folder found

    // TODO: ....
  } else {
    vscode.window.showInformationMessage(
      'package.json does not exist in the workspace.',
    );
  }
}

export async function touchReadme() {
  const wsPath = getWorkspacePath();
  if (!wsPath) {
    return;
  }

  const readmePath = path.join(wsPath, 'README.md');
  await updateTemplates(wsPath);

  try {
    let content = '';
    for (let key in templatePaths) {
      content +=
        (await compileTemplate(templatePaths[key], templateData)) + '\n\n';
    }

    await fs.promises.writeFile(readmePath, content);

    // after creation, open the README.md file
    const readmeDoc = await vscode.workspace.openTextDocument(readmePath);
    await vscode.window.showTextDocument(readmeDoc);
  } catch (error) {
    vscode.window.showErrorMessage('Failed to create or replace README.md: ');
  }
}
