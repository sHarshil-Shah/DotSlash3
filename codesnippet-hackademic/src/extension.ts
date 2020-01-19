// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { InputBoxOptions } from 'vscode';
import * as request from "request-promise-native";

async function sendToServerApi(action: String, subaction: String, language: String, template: String){
	const formData = {
		// Pass a simple key-value pair
		action: action,
		// Pass data via Buffers
		subaction: subaction,
		language: language,
		template: template,
		instruction: ""
		// Pass data via Streams
	}
	return request.post({url:'http://127.0.0.1:8080/api/extension', headers:{"Origin":"http://127.0.0.1:8080"}, json: formData});
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "codesnippet-hackademic" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
        vscode.window.showInformationMessage('Hello World!');

	});
	context.subscriptions.push(disposable);

	let disposable2 = vscode.commands.registerCommand('extension.createSnippet', () => {
		// The code you place here will be executed every time your command is executed

        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        var selection = editor.selection;
        var text = editor.document.getText(selection);

		let options: InputBoxOptions = {
            prompt: "Action: ",
            placeHolder: "E.g. File operations"
        }
		let options2: InputBoxOptions = {
            prompt: "Sub-action: ",
            placeHolder: "Read a file"
        }

        vscode.window.showInputBox(options).then(value => {
            if (!value) return;
			var action = value;
			vscode.window.showInputBox(options).then(async value2 => {
				if (!value2) return;
				var subaction = value2;
				console.log(action, subaction);
				
				try 
				{
					const result = await sendToServerApi(action, subaction, "python", text);
					console.log(result);
					vscode.window.showInformationMessage( action + ' : ' + subaction +  ' Created!');
				}
				catch(error){
					console.log(error);
					vscode.window.showInformationMessage("Some error occured");
				}
			});	
        });
	});

	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {}
