import admin from "firebase-admin";
import * as serviceAccount from "../config/firebaseServiceAccount.json";
import { Request } from "express";
import crypto from "crypto";
import "dotenv/config";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: process.env.FIREBASE_BUCKET,
});

const bucket = admin.storage().bucket();

export class FirebaseService {

  async uploadImageInBucket(req: Request) {

    const hash = crypto.randomBytes(5).toString("hex");

    const image = req.file as Express.Multer.File;

    const fileName = `${hash}-${image.originalname}`;

    const imageBuffer = image.buffer;

    const fileBucket = bucket.file(fileName);

    await fileBucket.save(imageBuffer);

    const [url] = await fileBucket.getSignedUrl({
      action: "read",
      expires: "01-01-2100",
    });

    return {url, fileName};
    
  }



  async deleteUploadInBucket(fileName: string | undefined){

      if(!fileName) return 

      const fileForDelete = bucket.file(fileName);

      await fileForDelete.delete();

  }

}
