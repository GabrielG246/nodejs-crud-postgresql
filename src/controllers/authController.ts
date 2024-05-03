//Interface Request y Response para tipear parametros de los callbacks.
import { Request, Response } from "express";
//Importar Servicios Personalizados "hashPassword" y "generateToken"
import { hashPassword } from "../services/pass.service";
import { generateToken } from "../services/auth.service";
//Importar Modelo de Prisma
import prisma from "../models/user"


//Definición de Controlador de Registro
export const register = async(req: Request, res: Response): Promise<void> =>{

    //Capturar Datos de Registro con req.body
    const {email, pass} = req.body

    try {
        //Hashear Contraseña con Servicio "hashPassword"
        const hashedPass= await hashPassword(pass);

        //Crear Registro en la BD con prisma.create
        const userReg = await prisma.create({
            data: {
                email: email,
                pass: hashedPass
            }
        })

        //Brindar Token post Registro para Logueo automático.
        const token = generateToken(userReg);
        res.status(201).json({token})

    } catch (error) {

        //TO-DO: Mejorar Manejo de Errores
        console.log(error);
        res.status(500).json({error: "Hubo un error en el registro."})
    }
}