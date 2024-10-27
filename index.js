import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/user.js";
import productsRouter from "./routes/products.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("/Images"));
app.use("/Images", express.static(path.join(__dirname, "Images")));

mongoose
  .connect(
    "mongodb+srv://xabibullayevmm:16xm06xmA@itmatryoshkabot.fuq8ext.mongodb.net/fermershop?retryWrites=true&w=majority&appName=itmatryoshkabot"
  )
  .then(() => {
    console.log("Mongodb connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000...");
});
