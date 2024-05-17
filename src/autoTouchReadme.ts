import * as vscode from 'vscode';

const autoTouchReadme = async (uri: vscode.Uri) => {
  vscode.window.showInformationMessage(
    'autoTouchReadme function called ===> README.md is Touched!',
  );
};

export { autoTouchReadme };
