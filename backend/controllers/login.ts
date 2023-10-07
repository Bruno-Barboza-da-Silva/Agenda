import { Schema, model, connect } from 'mongoose';
import mongoose from "mongoose";
import express, { Request, Response } from 'express';
import argon2 from 'argon2';
import IUser from './inteface/usuarios.interface';
import User from './models/usuarios.models'
import cookieParser from 'cookie-parser';
import crypto from 'crypto';




const loginController = {
  index: async (request: Request, response: Response) => {
    const requestBody: { email: string; senha: string } = request.body;
    
    console.log(request.session)
    console.log(request.session.authenticated)
    
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
            request.session.authenticated = true

            console.log(request.session)
            console.log(request.session.authenticated)


console.log('Sessão criada e cookie definido');
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
    
    try {
      const usuario = await FindEmail(requestBody);

      if (usuario) {
        // Se o usuário existe e a senha está correta, envie dados relevantes para o frontend
        const responseData = {
          id: usuario._id,
          nome: usuario.nome,
          // Adicione outros campos que deseja enviar para o frontend
        };
        console.log(responseData)
        response.status(200).json(responseData);
      } else {
        response.status(400).json({ message: 'E-mail ou senha incorretos' });
      }

    } catch (error) {
      console.error(error);
      response.status(500).send('Erro interno do servidor');
    }
  },
};

export default loginController;
