//Interface Request y Response para tipear parametros de los callbacks.
import { Request, Response } from "express";
//Importar Servicios Personalizados "hashPassword" y "generateToken"
import { comparePassword, hashPassword } from "../services/pass.service";
import { generateToken } from "../services/auth.service";
//Importar Modelo de Prisma
import prisma from "../models/user"


//Definición de Controlador de Registro
export const register = async(req: Request, res: Response): Promise<void> =>{

    //Capturar Datos de Registro con req.body
    const {email, pass} = req.body

    try {

        //Pre-Validaciones
        if(!email){ 
            throw new Error('El email es obligatorio') 
            return 
        }
        if (!pass){ 
            throw new Error('La contraseña es obligatoria') 
            return
        }

        //Hashear Contraseña con Servicio "hashPassword"
        const hashedPass= await hashPassword(pass);

        //Crear Registro en la BD con prisma.create
        const userReg = await prisma.user.create({
            data: {
                email: email,
                pass: hashedPass
            }
        })

        //Brindar Token post Registro para Logueo automático.
        const token = generateToken(userReg);
        res.status(201).json({token})

    } catch (error:any) {

        //Validaciones
        if(!email){
            res.status(400).json({message: 'El email es obligatorio'});
        }
        if(!pass){
            res.status(400).json({message: 'La contraseña es obligatoria'});
        }
        //Code 'P2002' hace referencia a un error de duplicado en campos únicos como el email.
        if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(400).json({message: 'El email ingresado ya existe'})
        }
        res.status(500).json({error: 'Hubo un error en el registro'})
    }

}

//Controlador de Logueo
export const login = async(req: Request, res: Response): Promise<void> =>{

    const {email, pass}= req.body;

    try {
        
        //Pre Validación
        if(!email){
            throw new Error('El email es obligatorio');
        }
        if(!pass){
            throw new Error('La contraseña es obligatoria')
        }

        const user = await prisma.findUnique({ where: {email: { email }} })

        if(!user){
            res.status(404).json({error: 'Usuario o Contraseña no son válidos'})
            return
        }

        const passMatch= await comparePassword(pass, user.pass)

        //Validación de Password
        if(!passMatch){
            res.status(401).json({error: 'Usuarios o Contraseña no válidos'})
            return
        }

        const token= generateToken(user);
        res.status(200).json({token})

    } catch (error) {
        console.log(error);
    }
}