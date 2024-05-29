import express from "express";
import mongoose from "mongoose";
import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validations.js";
import cors from "cors";
import {
  UserController,
  PostController,
  CommentController,
} from "./controllers/index.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

import multer from "multer";

mongoose
  .connect(
    "mongodb+srv://user:user123@cluster0.eauejdv.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());

app.get("/posts/comments", CommentController.getComments);
app.post("/posts/:id/comments", checkAuth, CommentController.createComment);

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  console.log(req.file);

  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/tags", PostController.getLastTags);

app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/tags/:tag", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  handleValidationErrors,
  PostController.update
);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`server has been started on ${PORT} port`);
});
