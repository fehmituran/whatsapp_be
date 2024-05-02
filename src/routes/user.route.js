import express from "express";
import trimRequest from "trim-request";
import { searchUsers } from "../controllers/user.controller.js";
import authMildware from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.route("/").get(trimRequest.all, authMildware, searchUsers);
export default router;
