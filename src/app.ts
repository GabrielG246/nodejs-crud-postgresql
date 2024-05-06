import dotenv from 'dotenv';
import express from 'express';

import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'

//Configurar para uso de Variables de Entorno
dotenv.config()

const app= express()

app.use(express.json());

//Routes
app.use('/auth', authRoute)
app.use('/users', userRoute)

export default app