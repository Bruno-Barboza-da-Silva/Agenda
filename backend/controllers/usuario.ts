import { Schema, model, connect } from 'mongoose';
import express, { Request, Response } from 'express';

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
      // Verifica se todas as propriedades necessárias estão presentes na solicitação
      response.status(400).send('Parâmetros incompletos na solicitação');
      return;
    }

    const responseBody: string = 'Solicitação POST recebida com sucesso!';
    response.send(responseBody);

    try {
      await run(requestBody);
    } catch (error) {
      console.error(error);
      response.status(500).send('Erro interno do servidor');
    }

    async function run(requestBody: { nome: string; email: string; senha: string }) {
      // 4. Connect to MongoDB with the "agenda" database.
      await connect('mongodb://127.0.0.1:27017/agenda'); // 'agenda' é o nome do banco de dados

      const user = new User({
        nome: requestBody.nome,
        email: requestBody.email,
        senha: requestBody.senha,
      });
      await user.save();

      console.log(user.nome, user.email, user.senha);
    }
  },
};

export default usuarioController;











