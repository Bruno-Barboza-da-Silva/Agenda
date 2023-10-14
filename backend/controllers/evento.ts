import { Schema, model, connect } from 'mongoose';
import mongoose from "mongoose";
import express, { Request, Response } from 'express';
import argon2 from 'argon2';
import IUser from './inteface/usuarios.interface';
import User from './models/usuarios.models'
import cookieParser from 'cookie-parser';
import crypto from 'crypto';




const eventoController = {
  index: async (request: Request, response: Response) => {
    console.log("eventos!!!")
    console.log(request.body)
  },
};

export default eventoController;