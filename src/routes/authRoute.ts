import express from 'express';

//Importar Controladores
import { register } from '../controllers/authController';

//Importar router
const router = express.Router();


//Definir Rutas con un Controllador como Callback
router.post('/register', register)
router.post('/login')


//Exportar router
export default router;