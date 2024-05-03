//Modelo de Prisma

//Importar Cliente de Prisma
import { PrismaClient } from "@prisma/client";

//Crear Instancia del Cliente de Prisma
const prisma= new PrismaClient();


//Exportar 
export default prisma.user;