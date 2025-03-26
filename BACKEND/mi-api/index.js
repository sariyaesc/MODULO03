const express = require("express");
const app = express();
const port = 3010;
const http=require ('http')
const {Server}=require("socket.io")
const chatSocket= require("./sockets/chat")

const userRoutes = require("./routes/users");
const { testConnection } = require("./config/db");

app.use(cors())

const server=http.createServer(app)
const io= new Server(server,{
  cors: {
    origin:'*',
    methods:["GET","POST"]}
  
})

io.on('connection',(socket)=>{
      console.log(`Usuario conectado: ${socket.id}`);
      socket.on('message',(msg)=>{
          console.log(`Mensaje recibido: ${msg}`)
          io.emit('message',msg) //mensaje a todos los usuarios conectados
      });

      socket.on('disconnect',()=>{
          console.log(`Usuario desconectado: ${socket.id}`)
      })
  }) //abre conexion 

server.listen(3010,()=>{
  console.log("Servidor corriendo en http://localhost:3010")
})
