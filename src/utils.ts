import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

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
