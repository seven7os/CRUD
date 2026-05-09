import readline from 'readline';
import { cadastrarUsuario, logarUsuario, validarNome, validarEmail, validarSenha } from '../database/users.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function cadastrarUsuarioFlow() {
  const nome = (await ask("Digite seu nome de usuário: ")).trim();
  if (!validarNome(nome)) {
    console.log("Nome inválido. O nome não pode estar vazio.");
    return;
  }

  const email = (await ask("Digite seu email: ")).trim();
  if (!validarEmail(email)) {
    console.log("Email inválido. Por favor, insira um email válido.");
    return;
  }

  const senha = await ask("Digite sua senha: ");
  if (!validarSenha(senha)) {
    console.log("Senha inválida. A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  await cadastrarUsuario(nome, email, senha);
}


