import express, { Request, Response, urlencoded } from 'express';
import cors from 'cors';
import cadastroUsuarioRouter from './routes/usuarios.router';
import session, { Session } from 'express-session';
import cookieParser from 'cookie-parser';
import loginRouter from "./routes/login.router"
import crypto from 'crypto'
import painelRouter from './routes/painel.router'
import bodyParser from 'body-parser';
const app = express();



declare module 'express-session' {
  interface SessionData {
    authenticated: boolean;
    userId: string;
  }
}

app.use(
  session({
    secret: 'some secret',
    resave: false,
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
  })
);




app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());

app.use('/cadastro', cadastroUsuarioRouter);

app.use('/entrar', loginRouter);

app.use('/painel', painelRouter);


app.post('/login', (req, res) => {
  console.log(req.sessionStore)
  console.log(req.body.name)
  res.send(200)
})



app.listen(5000, () => {
  console.log('Aplicação rodando na porta 5000');
});
