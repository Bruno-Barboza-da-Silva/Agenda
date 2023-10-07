import express, { Router, Request, Response, NextFunction } from 'express';
import painelController from '../controllers/painel';

const router = Router();


// Middleware personalizado para validação de cookie
function validateCookie(request: Request, response: Response, next: NextFunction) {
    const { cookies } = request;
    if("session_id" in cookies) {
        console.log("Session ID exists")
        if(cookies.session_id === "123456"){
            console.log("session ID is correct")
            next();
        } else {
            response.status(403).send({message: "Not Authenticated"})
        }
    } else {
        response.status(403).send({message: "Not Authenticated"})
    }
}



router.get('/:id', painelController.index);

export default router;