import app from "./app";

const PORT= process.env.PORT;

//Escuchar Servidor
app.listen(PORT, ()=>{
    console.log(`Server escuchando en puerto: ${PORT}`);
})