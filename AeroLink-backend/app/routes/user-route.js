import express from "express";
import * as userController from "../controllers/user-controller.js"
// refresh token route
const userRouter = express.Router();

userRouter
  .route("/id/:id")
  .get(userController.getUser);

userRouter
  .route("/register")
  .post(userController.register);

  userRouter
  .route("/:email").get(userController.searchUserByEmailId);

  userRouter
  .route("/login").post(userController.login);

export default userRouter;