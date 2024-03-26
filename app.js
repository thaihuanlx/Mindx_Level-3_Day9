import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserController from "./controllers/userController";
import PostController from "./controllers/PostController";
import CommentController from "./controllers/commentController";

const app = express();

// Kết nối MongoDB
mongoose
  .connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(bodyParser.json());

// Routes
app.post("/register", UserController.register);
app.post("/login", UserController.login);

app.post("/post/create", PostController.create);
app.put("/post/edit/:postId", PostController.edit);

app.post("/comment/create", CommentController.create);
app.put("/comment/edit/:commentId", CommentController.edit);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
