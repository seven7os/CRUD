import readline from 'readline';
import { cadastrarUsuario, validarNome, validarEmail, validarSenha } from '../database/users.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let isRunning = true;

function showMenu() {
  console.log("\nMenu de Opções:");
  console.log("1. Cadastrar Usuário");
  console.log("2. Logar Usuário");
  console.log("3. Mudar Senha");
  console.log("4. Sair");
}

function handleMenuOption() {
    rl.question("Escolha uma opção: ", (option) => {
        if (option === "1") {
            rl.question("Digite seu nome de usuário: ", (nome) => {
                const nomeValido = validarNome(nome);
                if (!nomeValido) {
                    console.log("Nome inválido. O nome não pode estar vazio.");
                    showMenu();
                    handleMenuOption();
                    return;
                }
                rl.question("Digite seu email: ", (email) => {
                    const emailValido = validarEmail(email);
                    if (!emailValido) {
                        console.log("Email inválido. Por favor, insira um email válido.");
                        showMenu();
                        handleMenuOption();
                        return;
                    }
                    rl.question("Digite sua senha: ", (senha) => {
                        const senhaValida = validarSenha(senha);
                        if (!senhaValida) {
                            console.log("Senha inválida. A senha deve ter pelo menos 6 caracteres.");
                            showMenu();
                            handleMenuOption();
                            return;
                        }
                        cadastrarUsuario(nome, email, senha);
                        showMenu();
                        handleMenuOption();
                    });
                });
            });
        }
    });
}

rl.on('close', () => {
  console.log("Encerrando o programa...");
  process.exit(0);
});

export { showMenu, handleMenuOption };