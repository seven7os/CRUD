import readline from 'readline';
import { db } from './db.js';
import { validarEmail, validarSenha, mudarSenha } from './users.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function mudarSenhaFlow() {
  const email = (await ask('Digite seu email: ')).trim();
  if (!validarEmail(email)) {
    console.log('Email inválido. Por favor, insira um email válido.');
    return;
  }

  const senhaAtual = await ask('Digite sua senha atual: ');
  if (!validarSenha(senhaAtual)) {
    console.log('Senha inválida. A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  const novaSenha = await ask('Digite sua nova senha: ');
  if (!validarSenha(novaSenha)) {
    console.log('Senha inválida. A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  try {
    const result = await db.execute('SELECT password FROM users WHERE email = ?', [email]);
    const user = result.rows?.[0] ?? null;

    if (!user) {
      console.log('Usuário não encontrado. Verifique o email e tente novamente.');
      return;
    }

    if (user.password !== senhaAtual) {
      console.log('Senha atual incorreta.');
      return;
    }

    await mudarSenha(email, novaSenha);
  } catch (error) {
    console.log('Erro ao processar a alteração de senha:', error.message);
  }
}

export { mudarSenhaFlow };