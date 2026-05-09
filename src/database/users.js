import validator from 'validator';
import { db } from './db.js';

// Validar o email 

function validarEmail(email) {
    return validator.isEmail(email);
}

// Validar a senha

function validarSenha(senha) {
    if (senha.length < 6) {
        return false;
    }
    return true;
}

function validarUsuario(email, senha) {
    return validarEmail(email) && validarSenha(senha);
}

function validarNome(nome) {
    return nome.trim() !== "";
}


async function cadastrarUsuario(nome, email, senha) {
    if (!validarNome(nome)) {
        console.log("Nome inválido.");
        return;
    }
    if (!validarUsuario(email, senha)) {
        console.log("Email ou senha inválidos.");
        return;
    }

    try {
        await db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [nome, email, senha]);
        console.log("Usuário cadastrado com sucesso!");
    } catch (error) {
        console.log("Erro ao cadastrar usuário:", error.message);
    }
}

async function logarUsuario(email, senha) {
    if (!validarUsuario(email, senha)) {
        console.log("Email ou senha inválidos.");
        return;
    }

    try {
        const result = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        const user = result.rows?.[0] ?? null;

        if (user && user.password === senha) {
            console.log(`Bem-vindo de volta, ${user.name}!`);
        } else {
            console.log("Email ou senha incorretos.");
        }
    } catch (error) {
        console.log("Erro ao logar usuário:", error.message);
    }
}

async function mudarSenha(email, novaSenha) {
    if (!validarSenha(novaSenha)) {
        console.log("Senha inválida. A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    try {
        await db.execute("UPDATE users SET password = ? WHERE email = ?", [novaSenha, email]);
        console.log("Senha atualizada com sucesso!");
    } catch (error) {
        console.log("Erro ao atualizar senha:", error.message);
    }
}

async function mudarEmail(email, novoEmail) {
    if (!validarEmail(novoEmail)) {
        console.log("Email inválido.");
        return;
    }

    try {
        await db.execute("UPDATE users SET email = ? WHERE email = ?", [novoEmail, email]);
        console.log("Email atualizado com sucesso!");
    } catch (error) {
        console.log("Erro ao atualizar email:", error.message);
    }
}

async function mudarNome(email, novoNome) {
    if (!validarNome(novoNome)) {
        console.log("Nome inválido.");
        return;
    }

    try {
        await db.execute("UPDATE users SET name = ? WHERE email = ?", [novoNome, email]);
        console.log("Nome atualizado com sucesso!");
    } catch (error) {
        console.log("Erro ao atualizar nome:", error.message);
    }
}

export { validarEmail, validarSenha, validarNome, cadastrarUsuario, logarUsuario, mudarSenha, mudarEmail, mudarNome };