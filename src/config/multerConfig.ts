import multer from "multer";

export const Multer = multer({
  storage: multer.memoryStorage(),
  
  limits: {
    fileSize: 8 * 1024 * 1024,
  },

  fileFilter(req, file, cb) {
    const mimeType = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

    if (!mimeType.includes(file.mimetype)) {
      return cb(null, false);
    }

    return cb(null, true);
  },

});
