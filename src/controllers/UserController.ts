import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { FirebaseService } from "../services/firebaseServices";

const prisma = new PrismaClient();
const firebaseService = new FirebaseService ;

class UserController {

  async getAll(req: Request, res: Response) {
    const authors = await prisma.user.findMany();

    return res.status(200).json(authors);
  }

  async addFiles(req: Request, res: Response) {
     
    try {
      const { author } = req.body;
      const {url, fileName} = await firebaseService.uploadImageInBucket(req); 

      if(!author || !url || !fileName) throw Error;

      const user = await prisma.user.create({
        data: {
          author,
          image: url,
          fileName
        },
      });
      
      return res.status(200).json(user);

    } catch (err) {

        return res.json({
          err: err,
          status: res.status(400)
        })
    }
  }


  update(req: Request, res: Response){


    
  }

  async delete(req: Request, res: Response){

    const {id} = req.params; 
   
    try {
      const  findFileName = await prisma.user.findUnique({
        where:{
         id: id
        }
      }); 
      
      const fileName = findFileName?.fileName;

      if(findFileName){

        const authorDeleteImage = await prisma.user.delete({
          where:{
            id
          }
        }); 

         firebaseService.deleteUploadInBucket(fileName);
        res.status(200).json({
          sucess: 'sucess request', 
          data: authorDeleteImage
        
        });

      } else{

        res.status(404).json({ message: 'Author not find' });
      }


    } catch (error) {

      res.status(500).json({ message: 'Error to find author' });

    }

  }


}


export default UserController;
