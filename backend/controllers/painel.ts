import { Schema, model, connect } from 'mongoose';
import express, { Request, Response } from 'express';
import User from './models/usuarios.models';
import cookieParser from 'cookie-parser';

const loginController = {
  index: async (request: Request, response: Response) => {
    console.log("cheguei aqui");
    response.cookie("session_id", "123456")
    response.status(200).json({message: "logged in"})
    console.log(request.session)

   
  },
};

export default loginController;