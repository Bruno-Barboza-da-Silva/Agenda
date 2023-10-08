import { Schema, model, connect } from 'mongoose';
import express, { Request, Response } from 'express';
import User from './models/usuarios.models';
import IUser from './inteface/usuarios.interface';
import cookieParser from 'cookie-parser';



const loginController = {
  index: async (request: Request, response: Response) => {

    interface SessionStore {
      sessions: {
        [key: string]: string;
      };
    }
    
    const sessionStore = request.sessionStore as unknown as SessionStore;
    const sessions = sessionStore.sessions;
    const sessao = JSON.stringify(sessions)
    const slicesessao = sessao.slice(-29,-5)
    const sliceAuthenticated = sessao.slice(-47,-43)
    console.log(sessao)
    console.log(slicesessao)
    console.log(sliceAuthenticated)


    try {
      if (sliceAuthenticated === 'true') {
        const data = await findData(slicesessao);
        const sendData = {
          id:  data._id,
          nome: data.nome,
          email: data.email
        }
        console.log(sendData)
        response.status(200).json(sendData);
      } else {
        response.status(400).json({ message: 'Sessão expirada ou inexistente' });
      }
    } catch (error) {
      console.error('Erro interno do servidor:', error);
      response.status(500).send('Erro interno do servidor');
    }

    console.log('cheguei aqui');
  },
};

async function findData(slicesessao: string) {
  await connect('mongodb://127.0.0.1:27017/agenda');

  try {
    const usuario = await User.findById({ _id: slicesessao });

    if (usuario) {
      console.log('Usuário encontrado');
      return usuario;
    } else {
      throw new Error('Usuário não encontrado');
    }
  } catch (error) {
    console.error('Erro ao procurar o usuário:', error);
    throw error;
  }
}
    
export default loginController;










