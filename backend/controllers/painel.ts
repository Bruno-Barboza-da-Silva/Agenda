import { Schema, model, connect } from 'mongoose';
import express, { Request, Response } from 'express';
import User from './models/usuarios.models';
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
    const sessaoProcessada = sessao.split("userId")
    const sessaoProcessada2 = sessaoProcessada[1].slice(5,-5)
console.log(sessaoProcessada2)

    // console.log(sessaoProcessada)
    
    
    console.log("cheguei aqui");
    response.status(200).json({message: "logged in"})

    
    console.log(typeof sessao)

   
  },
};

export default loginController;