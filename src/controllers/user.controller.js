import createHttpError from "http-errors";

import { searchUsers as searchUsersService } from "../services/user.service.js";
import logger from "../configs/logger.config.js";

export const searchUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search;
    console.log(keyword);
    if (!keyword) {
      logger.error("Please add a search query first");
      throw createHttpError.BadGateway("Oops.... Something went rong!");
    }
    const users = await searchUsersService(keyword);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
