import { Schema, model, connect } from 'mongoose';
import express, { Request, Response } from 'express';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  nome: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  nome: { type: String, required: true },
});

// 3. Create a Model for the "usuarios" collection in the "agenda" database.
const User = model<IUser>('usuarios', userSchema); // 'usuarios' é o nome da coleção

const usuarioController = {
  cadastro: async (request: Request, response: Response) => {
    const requestBody: { nome: string } = request.body; // 'requestBody' é um objeto com uma propriedade 'nome' de tipo string

    const responseBody: string = 'Solicitação POST recebida com sucesso!';
    response.send(responseBody);

    try {
      await run(requestBody);
    } catch (error) {
      console.error(error);
    }

    async function run(requestBody: { nome: string }) {
      // 4. Connect to MongoDB with the "agenda" database.
      await connect('mongodb://127.0.0.1:27017/agenda'); // 'agenda' é o nome do banco de dados

      const user = new User({
        nome: requestBody.nome,
      });
      await user.save();

      console.log(user.nome); // Deve ser o nome que você recebeu na solicitação
    }
  },
};

export default usuarioController;











