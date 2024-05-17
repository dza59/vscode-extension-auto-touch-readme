import * as vscode from 'vscode';
import * as utils from './utils';
import { autoTouchReadme } from './autoTouchReadme';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'auto-touch-readme.addReadme',
    autoTouchReadme,
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
