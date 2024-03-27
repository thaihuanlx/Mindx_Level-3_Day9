import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./Routes/userRoute.js"

const app = express();
const url = `mongodb+srv://hth:admin123@test.s1hlsnb.mongodb.net/?retryWrites=true&w=majority&appName=Test`;
// Kết nối MongoDB
app.use(express.json());

app.use("/", userRoute);
mongoose
  .connect(url)
  .then(() => console.log("Connected to database successfully"))
  .catch((error) => console.error("Database connection failed", error));

app.use(bodyParser.json());


app.listen(3000, () => console.log("Server running on port 3000"));
