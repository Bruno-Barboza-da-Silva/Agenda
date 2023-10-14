import { Schema, model, connect } from 'mongoose';
import mongoose from "mongoose";
import express, { Request, Response } from 'express';
import argon2 from 'argon2';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import Evento from './models/eventos.models'



const eventoController = {
  index: async (request: Request, response: Response) => {
    console.log("eventos!!!")
    console.log(request.body)

    const requestBody: { evento: string; hora: string; data: string; outros: string; cor: string, email_usuario: string} = request.body;

    async function run(requestBody: { evento: string; hora: string; data: string; outros: string; cor: string; email_usuario: string }) {
      await connect('mongodb://127.0.0.1:27017/agenda');

      const evento = new Evento({
        evento: requestBody.evento,
        hora: requestBody.hora,
        data: requestBody.data,
        outros: requestBody.outros,
        cor: requestBody.cor,
        email_usuario: requestBody.email_usuario
      });

      await evento.save();
    }




  try {

    await run(requestBody);

    response.status(200).json({ message: 'Evento cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    response.status(500).send('Erro ao cadastrar evento');
  }




  },
};

export default eventoController;