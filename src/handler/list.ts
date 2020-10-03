/**
 * @description handler for create list pages
 */
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { createSearchForm } from '../core/list'

export default function listHandler(e: vscode.Uri): void {
  const stat = fs.statSync(e.fsPath);
  const dir = path.normalize(e.fsPath);
  console.log('stat.isDirectory()', stat.isDirectory())
	if (stat.isDirectory()) { // create directly
		
	} else {
		fs.readFile(e.fsPath,'utf8', (err, fileData) => {
			const json = JSON.parse(fileData)
			const pathList = e.fsPath.split('/')
			pathList.pop()
			createSearchForm(pathList.join('/'), json.form)
		})
	}
}