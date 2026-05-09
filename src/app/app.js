import readline from 'readline';
import db from '../database/db.js';
import { showMenu } from './menuOptions.js';
import { handleMenuOption } from './menuOptions.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let isRunning = true;


function runApp() {
    showMenu();
    handleMenuOption();
}


export { runApp };