import dotenv from 'dotenv';
import express from 'express';

import authRoute from './routes/authRoute'

//Configurar para uso de Variables de Entorno
dotenv.config()

const app= express()

app.use(express.json());

//Routes
app.use('/auth', authRoute)

export default app