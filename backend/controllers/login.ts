import { Schema, model, connect } from 'mongoose';
import mongoose from "mongoose";
import express, { Request, Response } from 'express';
import argon2 from 'argon2';
import IUser from './inteface/usuarios.interface';
import User from './models/usuarios.models'

const loginController = {
  index: async (request: Request, response: Response) => {
    const requestBody: { email: string; senha: string } = request.body;

    if (!requestBody.email || !requestBody.senha) {
      response.status(400).send('Parâmetros incompletos na solicitação');
      return;
    }

    async function FindEmail(requestBody: { email: string; senha: string }) {
      await connect('mongodb://127.0.0.1:27017/agenda');
    
      try {
        const usuario = await User.findOne({ email: requestBody.email });
    
        if (usuario) {
          const senhaValida = await argon2.verify(usuario.senha, requestBody.senha);
          if (senhaValida) {
            console.log("senha correta")
            return usuario;
          } else {
            console.error('Senha incorreta');
            return null;
          }
        }
    
        return null;
      } catch (error) {
        console.error('Erro ao procurar o usuário:', error);
        throw error;
      }
    }
    
    console.log("estou fora");

    try {
      const EmailExistente = await FindEmail(requestBody);

      if (EmailExistente) {
        // Se o usuário já existe, envie uma resposta informando o usuário
        response.status(400).json({ message: 'E-mail já cadastrado' });
        return;
      }
      
      // Resto do seu código aqui

    } catch (error) {
      console.error(error);
      response.status(500).send('Erro interno do servidor');
    }
  },
};

export default loginController;

