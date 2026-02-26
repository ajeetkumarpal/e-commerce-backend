import fs from "fs";
import path from "path";
import multer from "multer";

const uploadDir = "/tmp/uploads";

// Folder exist nahi karta to create kar do
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
                                                                                                                  
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, baseName + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });
export default upload;



// import express from "express";
// import multer from "multer";
// const app = express();
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "src/upload"),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const baseName = path.basename(file.originalname, ext);
//     const uniqueName = baseName + Date.now() + ext;
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage: storage });
// export default upload;
