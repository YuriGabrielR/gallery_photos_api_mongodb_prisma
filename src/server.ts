import express from "express"
import cors from 'cors';
import routes from "./routes";
import 'dotenv/config'


const server = express(); 

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(routes);



server.listen(process.env.PORT || 8080 , ()=>{
    console.log('Server is Running ⚡');
})