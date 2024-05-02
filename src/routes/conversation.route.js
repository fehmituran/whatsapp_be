import express from "express";
import trimRequest from "trim-request";

import {
  createGroup,
  create_open_conversation,
  getConversations,
} from "../controllers/conversation.controller.js";
import authMildware from "../middlewares/authMiddlewares.js";
const router = express.Router();

router.route("/").post(trimRequest.all, authMildware, create_open_conversation);
router.route("/").get(trimRequest.all, authMildware, getConversations);
router.route("/group").post(trimRequest.all, authMildware, createGroup);

export default router;
