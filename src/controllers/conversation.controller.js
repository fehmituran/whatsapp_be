import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import {
  createConversation,
  doesConversationExist,
  getUserConversations,
  populateConversation,
} from "../services/conversation.service.js";
import { findUser } from "../services/user.service.js";

export const create_open_conversation = async (req, res, next) => {
  try {
    const sender_id = req.user.userId;
    const { receiver_id } = req.body;

    //check if receiver_id is provided
    if (!receiver_id) {
      logger.error(
        "Please provide the user id you wanna start a conversation with!"
      );
      throw createHttpError.BadGateway("Something went rong!");
    }

    const existed_conversation = await doesConversationExist(
      sender_id,
      receiver_id
    );

    if (existed_conversation) {
      res.json(existed_conversation);
    } else {
      let receiver_user = await findUser(receiver_id);

      let convoData = {
        name: receiver_user.name,
        picture: receiver_user.picture,
        isGroup: false,
        users: [sender_id, receiver_id],
      };

      const newConvo = await createConversation(convoData);

      const populatedConvo = await populateConversation(
        newConvo._id,
        "users",
        "-password"
      );
      res.status(200).json(populatedConvo);
    }
  } catch (error) {
    next(error);
  }
};

export const createGroup = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const getConversations = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const conversations = await getUserConversations(userId);
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};
