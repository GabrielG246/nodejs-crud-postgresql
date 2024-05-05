import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

//Middleware de JWT para verificar autenticación
const autenticateToken= (req: Request, res: Response, next: NextFunction)=>{
    const authHeader= req.headers['authorization']
    const JWT_SECRET= process.env.JWT_SECRET || 'secret-key-jwt'

    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({error: 'No autorizado'})
    }

    jwt.verify(token, JWT_SECRET)
};

router.post('/', autenticateToken, ()=>{})
router.get('/', autenticateToken, ()=>{})
router.get('/:id', autenticateToken, ()=>{})
router.put('/:id', autenticateToken, ()=>{})
router.delete('/:id', autenticateToken, ()=>{})


export default router;