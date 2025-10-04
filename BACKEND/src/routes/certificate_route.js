import express from "express";
import multer from "multer";
import fs from 'fs'
import { verifyCertificate } from "../controllers/certificateController.js";

const certificateRoutes = express.Router();

// --- Multer setup for file upload ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (
      ["application/pdf", "image/jpeg", "image/png"].includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, JPG, PNG files allowed!"));
    }
  },
});

// --- Route for certificate upload + verification ---
certificateRoutes.post("/upload", upload.single("certificate"), verifyCertificate);

export default certificateRoutes;
