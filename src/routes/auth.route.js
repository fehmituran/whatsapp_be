import express from "express";
import trimRequest from "trim-request";

import {
  login,
  logout,
  refreshtoken,
  register,
} from "../controllers/auth.controller.js";
import authMildware from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.route("/register").post(trimRequest.all, register);
router.route("/login").post(trimRequest.all, login);
router.route("/logout").post(trimRequest.all, logout);
router.route("/refreshtoken").post(trimRequest.all, refreshtoken);
router
  .route("/testingauthMiddlware")
  .get(trimRequest.all, authMildware, (req, res) => {
    res.send(req.user);
  });

export default router;
