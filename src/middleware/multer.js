import express from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "/tmp/uploads"), // Vercel/Render ke liye
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const uniqueName = baseName + Date.now() + ext;
    cb(null, uniqueName);
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
