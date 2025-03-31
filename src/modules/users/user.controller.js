import { request, response } from "express";
import { generateUsersMocks } from "../../mock/user.mock.js";
import { userService } from "./user.service.js";
import { logger } from "../../common/utils/logger.js";

class UserController {
    async getAll(req = request, res = response){
        try{
            res.send ("Get all users");
        }
        catch(error){
            logger.error(error);
        }
    }

    async createUsersMocks(req = request, res = response) {
        try {
          const { amount } = req.params;
          const users = await userService.createUsersMocks(amount);

          res.status(201).json(users);
        } catch (error) {
          logger.error(error);
          res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export const userController = new UserController();