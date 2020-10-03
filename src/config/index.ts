/**
 * @description config your command here
 * 
 */
import handlers from '../handler'
import * as vscode from 'vscode';

interface CommandItem  {
  name: string
  handler: (e: vscode.Uri) => void
}

export const comandList: CommandItem[] = [
  {
    name: 'list',
    handler: handlers.list
  }
]