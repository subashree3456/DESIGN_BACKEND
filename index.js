import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import taskRoute from "./routes/taskRoute.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URL);

app.use("/auth", authRoute);

app.use("/task", taskRoute);
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩!!!!!");
});

app.listen(PORT, () => {
  console.log("connected to MongoDB....");
});


// sBTnI8VvYOqvz7Dl