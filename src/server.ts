import app from "./app";

const PORT= process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server escuchando en puerto: ${PORT}`);
})