import { Schema, model, connect } from 'mongoose';
import mongoose from "mongoose";
import express, { Request, Response } from 'express';
import argon2 from 'argon2';
import IUser from './inteface/usuarios.interface';
import User from './models/usuarios.models'
import cookieParser from 'cookie-parser';
import crypto from 'crypto';




const logoutController = {
  index: async (request: Request, response: Response) => {
    if(request.session) {
        request.session.destroy((err) => {
            if (err) {
              console.error('Erro ao encerrar a sessão: ' + err);
            } else {
                console.log('foi')
                response.status(200).json({message: "Logout realizado com sucesso"})
            }
          });
    } else {
        response.status(400).json({message: "Sessão não existente"})
    }
  },
};

export default logoutController;
