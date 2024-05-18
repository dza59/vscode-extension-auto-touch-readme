import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as vscode from 'vscode';
import { templateData, templatePaths } from './constants';
import { getWorkspacePath, isFileExists, parseGitConfigForUrl } from './utils';

async function getScreenshots(
  wsPath: string,
): Promise<{ altText: string; label: string; path: string }[]> {
  const possibleNames = ['screenshots', 'screenshot', 'images'];
  try {
    const directories = await fs.promises.readdir(wsPath, {
      withFileTypes: true,
    });
    // Convert directory names to lowercase and find the first match
    const screenshotsDir = directories.find(
      (dir) =>
        dir.isDirectory() && possibleNames.includes(dir.name.toLowerCase()),
    );

    if (!screenshotsDir) {
      vscode.window.showInformationMessage(
        'No suitable screenshots directory found.',
      );
      return [];
    }

    const screenshotsPath = path.join(wsPath, screenshotsDir.name);
    const files = await fs.promises.readdir(screenshotsPath);
    // Use a regex to filter files based on image extensions
    const imageFiles = files.filter((file) => /\.(png|jpe?g|gif)$/i.test(file));

    // Map each filename to an object that the Handlebars template can use
    return imageFiles.map((filename, index) => ({
      altText: `Demo ${index + 1} Screen Shot`,
      label: `demo-${index + 1}`,
      path: `${screenshotsDir.name}/${filename}`,
    }));
  } catch (error) {
    vscode.window.showErrorMessage(`Error accessing the screenshots directory`);
    return [];
  }
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

async function getRepoUrl(wsPath: string): Promise<string> {
  const gitConfigPath = path.join(wsPath, '.git', 'config');
  try {
    const configContent = await fs.promises.readFile(gitConfigPath, 'utf8');
    return parseGitConfigForUrl(configContent);
  } catch (error) {
    console.error('Failed to read .git/config:', error);
    return 'Failed to access or read the .git/config file.';
  }
}
// compileTemplate function will compile the template data in Handlebars templates
export async function compileTemplate(filePath: string, data: any) {
  const content = await fs.promises.readFile(filePath, 'utf8');
  return Handlebars.compile(content)(data);
}

// this function will update the template data base on information from the workspace
async function updateTemplatesData(wsPath: string) {
  // for node.js project
  const pJsonFile = await isFileExists(wsPath, 'package.json');

  // for python project, TODO later...
  const reqFile = await isFileExists(wsPath, 'requirements.txt');

  const gitUrl = await getRepoUrl(wsPath);

  if (gitUrl) {
    templateData.gitUrl = gitUrl;
  }

  if (pJsonFile) {
    // Done: Update About section
    const projectName = await getProjectName(wsPath);
    if (projectName) {
      templateData.projectName = projectName;
    }

    // Done: update screenshots if there exist a screenshots folder
    const screenshots = await getScreenshots(wsPath);
    if (screenshots.length > 0) {
      templateData.screenshots = screenshots;
    }

    // FOR testing

    vscode.window.showInformationMessage(
      ` ${templateData.projectName}:  Found ${templateData.screenshots.length} screenshots. git URL: ${templateData.gitUrl}`,
    );

    // TODO: update the technologyStack array with the dependencies from package.json
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
  await updateTemplatesData(wsPath);

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
