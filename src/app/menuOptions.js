import readline from 'readline';
import { mudarSenhaFlow } from '../database/mudarSenhaUsuario.js';
import { cadastrarUsuarioFlow } from '../database/cadastrarUsuario.js';
import { logarUsuarioFlow } from '../database/logarUsuario.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function showMenu() {
  console.log("\nMenu de Opções:");
  console.log("1. Cadastrar Usuário");
  console.log("2. Logar Usuário");
  console.log("3. Mudar Senha");
  console.log("4. Sair");
}



async function handleMenuOption() {
  const option = (await ask("Escolha uma opção: ")).trim();

  switch (option) {
    case "1":
      await cadastrarUsuarioFlow();
      break;
    case "2":
      await logarUsuarioFlow();
      break;
    case "3":
      await mudarSenhaFlow();
      break;
    case "4":
      rl.close();
      return;
    default:
      console.log("Opção inválida. Digite 1, 2, 3 ou 4.");
  }

  showMenu();
  handleMenuOption();
}

rl.on('close', () => {
  console.log("Encerrando o programa...");
  process.exit(0);
});

export { showMenu, handleMenuOption };