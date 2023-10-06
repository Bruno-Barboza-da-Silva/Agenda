import { Schema, model, connect } from 'mongoose';
import express, { Request, Response } from 'express';
import argon2 from 'argon2';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  nome: string;
  email: string;
  senha: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
});

// 3. Create a Model for the "usuarios" collection in the "agenda" database.
const User = model<IUser>('usuarios', userSchema); // 'usuarios' é o nome da coleção

const usuarioController = {
  cadastro: async (request: Request, response: Response) => {
    const requestBody: { nome: string; email: string; senha: string } = request.body;

    if (!requestBody.nome || !requestBody.email || !requestBody.senha) {
      response.status(400).send('Parâmetros incompletos na solicitação');
      return;
    }

    try {
      const hashedPassword = await hashPassword(requestBody.senha);
      await run(requestBody, hashedPassword);

      // Após a criação bem-sucedida, exibir o alerta
      const alertMessage = 'Usuário cadastrado com sucesso!';
      response.status(200).json({ message: alertMessage });
    } catch (error) {
      console.error(error);
      response.status(500).send('Erro interno do servidor');
    }

    async function hashPassword(password: string) {
      try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
      } catch (error) {
        console.error('Erro ao hash da senha:', error);
        throw error;
      }
    }

    async function run(requestBody: { nome: string; email: string; senha: string }, hashedPassword: string) {
      await connect('mongodb://127.0.0.1:27017/agenda');

      const user = new User({
        nome: requestBody.nome,
        email: requestBody.email,
        senha: hashedPassword,
      });
      await user.save();

      console.log(user.nome, user.email, user.senha);
    }
  },
};

export default usuarioController;








