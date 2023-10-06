import { Schema, model, connect } from 'mongoose';
import express, { Request, Response } from 'express';
import User from './models/usuarios.models';
import cookieParser from 'cookie-parser';

const loginController = {
  index: async (request: Request, response: Response) => {
    console.log("cheguei aqui");
    

   
  },
};

export default loginController;