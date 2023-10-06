import express, { Request, Response } from 'express';
import cors from 'cors';
import cadastroUsuarioRouter from './routes/usuarios.router';
import session, { Session } from 'express-session';
import cookieParser from 'cookie-parser';
import loginRouter from "./routes/login.router"
import crypto from 'crypto'
import painelRouter from './routes/painel.router'

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/cadastro', cadastroUsuarioRouter);

app.use('/entrar', loginRouter);

app.use('/painel', painelRouter);


// Configuração do express-session
app.use(
  session({
    secret: crypto.randomBytes(64).toString('hex'), // Chave secreta para assinar os cookies
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Defina como true se estiver usando HTTPS
      maxAge: 3600000, // Tempo de expiração do cookie em milissegundos (1 hora neste exemplo)
    },
  })
);








app.listen(5000, () => {
  console.log('Aplicação rodando na porta 5000');
});







// app.post('/', (request: Request, response: Response) => {
  
//     const requestBody: string = request.body; // 'requestBody' é uma string
//     console.log(requestBody);
  
//     const responseBody: string = 'Solicitação POST recebida com sucesso!';
//     response.send(responseBody);
// });




// async function run() {
//   // 4. Connect to MongoDB with the "agenda" database.
//   await connect('mongodb://127.0.0.1:27017/agenda'); // 'agenda' é o nome do banco de dados

//   const user = new User({
//     nome: requestBody.nome,
//     // email: 'edson@initech.com',
//     // avatar: 'https://i.imgur.com/dM7Thhn.png'
//   });
//   await user.save();

//   console.log(user.nome); // 'bill@initech.com'
// }




// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(express.json());
// app.use(cors());

// app.post('/', (request, response) => {
//     console.log(request.body);
//     response.send('Solicitação POST recebida com sucesso!');
//   });


// app.post('/', (request: express.Request, response: express.Response) => {
//     // Agora 'request' e 'response' têm tipos específicos
  
//     const requestBody: string = request.body; // 'requestBody' é uma string
//     console.log(requestBody);
  
//     const responseBody: string = 'Solicitação POST recebida com sucesso!';
//     response.send(responseBody);
//   });






// const cadastroUsuarioRouter = require('./routes/cadastroUsuario.router')
// const usuarioController = {
//     index: async (request, response) => {
//       console.log(request.body.nome)
//       }
//     },

// app.post('/', usuarioController.index)



// // app.use("/cadastro", cadastroUsuarioRouter)
// app.use("/cadastro", cadastroUsuarioRouter)


// ///////////////////////////
// const { Router } = require('express');
// const usuarioController = require('../controller/usuarioController');

// const router = Router();

// router.post('/', usuarioController.index);


// module.exports = router;
// /////////////////////////

// const ClientsModel = require("../models/usuarioModel");
// const sequelize = require("../config/sequelize");
// sequelize.sync();

// const usuarioController = {
//   index: async (request, response) => {
//     await ClientsModel.create({
//       nome: request.body.nome,
//       email: request.body.email,
//       senha: request.body.senha,
//     });
//   },
// };


// module.exports = usuarioController;

// /////////////////////////



// const contactRouter = require('./routes/contactUs.router')


// app.use("/contact-us", contactRouter);


