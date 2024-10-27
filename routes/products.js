import crypto from "crypto";
import multer from "multer";
import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductsSort,
} from "../controllers/products.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },

  filename: (req, file, cb) => {
    console.log(file.originalname);
    crypto.randomBytes(16, (err, buf) => {
      if (err) throw err;
      const randomName = buf.toString("hex") + "-" + file.originalname;
      cb(null, randomName);
    });
  },
});

const upload = multer({ storage });

router.get("/:id", getProduct);

router.get("/", getProducts);

router.get("/sort/:id", getProductsSort);

router.post("/", upload.single("file"), addProduct);

router.delete("/:id", deleteProduct);

export default router;
