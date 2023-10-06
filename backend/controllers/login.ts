import { Schema, model, connect } from 'mongoose';
import express, { Request, Response } from 'express';
import argon2 from 'argon2';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  email: string;
  senha: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  senha: { type: String, required: true },
});

// Check if the model already exists before defining it
const User = model<IUser>('usuarios') || model<IUser>('usuarios', userSchema);

const loginController = {
  index: async (request: Request, response: Response) => {
    const requestBody: { email: string; senha: string } = request.body;

    if (!requestBody.email || !requestBody.senha) {
      response.status(400).send('Parâmetros incompletos na solicitação');
      return;
    }

    try {
      const user = await User.findOne({ email: requestBody.email });

      if (!user) {
        response.status(404).send('Usuário não encontrado');
        return;
      }

      const isPasswordValid = await argon2.verify(user.senha, requestBody.senha);

      if (!isPasswordValid) {
        response.status(401).send('Credenciais inválidas');
        return;
      }

      // Autenticação bem-sucedida, você pode criar uma sessão ou gerar um token JWT aqui
      console.log("Login bem-sucedido");
      response.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
      console.error(error);
      response.status(500).send('Erro interno do servidor');
    }
  },
};

export default loginController;