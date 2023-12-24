import { Router } from "express";
import { Multer } from "./config/multerConfig";
const routes = Router(); 
import UserController from "./controllers/UserController";
const userController = new UserController();

routes.get('/all', userController.getAll);
routes.post('/add', Multer.single("image"), userController.addFiles); 
routes.delete('/image/:id', userController.update); 
routes.delete('/image/:id', userController.delete); 



export default routes;