import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { touchReadme } from './app';
import { getWorkspacePath } from './utils';

export async function main() {
  const wsPath = getWorkspacePath();
  if (!wsPath) {
    return;
  }

  const readmePath = path.join(wsPath, 'README.md');

  try {
    await fs.promises.access(readmePath, fs.constants.F_OK);
    // Ask the user if they want to replace the existing README.md
    const userChoice = await vscode.window.showInformationMessage(
      'A README.md already exists in the workspace. Do you want to replace it?',
      'Yes',
      'Cancel',
    );

    if (userChoice === 'Yes') {
      touchReadme();
    }
  } catch {
    // If README does not exist, generate it
    touchReadme();
  }
}
