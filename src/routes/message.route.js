import express from "express";
import trimRequest from "trim-request";

import { sendMessage, getMessages } from "../controllers/message.controller.js";
import authMildware from "../middlewares/authMiddlewares.js";
const router = express.Router();

router.route("/").post(trimRequest.all, authMildware, sendMessage);
router.route("/:convo_id").get(trimRequest.all, authMildware, getMessages);
export default router;
