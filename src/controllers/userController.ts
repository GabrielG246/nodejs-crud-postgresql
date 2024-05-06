import { Request, Response } from "express"
import prisma from "../models/user"
import { hashPassword } from "../services/pass.service"


//Controlador de Creación de Usuario
export const createUser = async(req: Request, res: Response): Promise<void> => {

    try {

        const {email, password} = req.body 
        const hashedPass= await hashPassword(password)

        //Pre-validaciones
        if(!email){ 
            throw new Error('El email es obligatorio') 
            return 
        }
        if (!password){ 
            throw new Error('La contraseña es obligatoria') 
            return
        }


        //Proceso
        const user= await prisma.user.create({
            data: {
                email: email,
                password: hashedPass
            }
        })

        res.status(200).json(user)
    } catch (error:any) {
        if(error?.code==='P2002' && error?.meta?.target?.includes('email')){
            res.status(400).json({message: 'El email ingresado ya existe'})
        }
        console.log(error);
        res.status(500).json({error: 'Hubo un error en el registro'})
    }
}

//Controlador de Obtener todos los Usuarios
export const getAllUsers= async(req: Request, res: Response): Promise<void> =>{

    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)

    } catch (error:any) {
        console.log(error);
        res.status(500).json({error: 'Hubo un error al traer los usuarios.'})
    }
}

//Controlador para Obtener Usuario Específico
export const getUserById= async(req: Request, res: Response): Promise<void> =>{
    const userId= parseInt(req.params.id)

    try {
        const user = prisma.user.findUnique(
            {where: {id: userId}}
        )

        if(!user){
            res.status(404).json({error:'Usuario no encontrado'});
            return
        }

        res.status(200).json(user)

    } catch (error:any) {
        console.log(error);
        res.status(500).json({error:'Hubo un error, intente nuevamente más tarde'})
    }
}

//Controlador para Modificar Datos de Usuario
    export const updateUser = async(req: Request, res: Response): Promise<void> =>{
        //Capturar Id y Contraseña
        const userId= parseInt(req.params.id)
        const {email, password} = req.body

        try {

            //Crea una Copia de los datos de req.body (Datos a actualizar)
            let dataToUpdate: any = {...req.body}

            //Si existe contraseña, se hashea y se guarda en los datos a actualizar
            if(password){
                const hashedPassword= await hashPassword(password);
                dataToUpdate.password= hashedPassword;
            }

            //Si existe Email, se guarda en datos a actualizar
            if(email){
                dataToUpdate.email = email
            }

            const user = prisma.user.update(
                {
                    //Buscar Usuario
                    where: {id: userId},
                    //Datos Nuevos
                    data: dataToUpdate
                }

            )

            if(!user){
                res.status(404).json({error:'Usuario no encontrado'});
                return
            }

            res.status(200).json(user)

        } catch (error:any) {
            console.log(error);
            res.status(500).json({error:'Hubo un error, intente nuevamente más tarde'})
        }
    }