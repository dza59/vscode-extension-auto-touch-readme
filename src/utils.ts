import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import * as Handlebars from 'handlebars';

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

export function parseGitConfigForUrl(configContent: string): string {
  const urlMatch = configContent.match(/^\s*url\s*=\s*(.+)$/m);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1].trim();
  }
  return '';
}

export async function getScreenshots(
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

export async function getRepoUrl(wsPath: string): Promise<string> {
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
