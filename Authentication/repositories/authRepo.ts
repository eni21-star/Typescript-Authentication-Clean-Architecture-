import { logger } from "../../config/loggerConfig";
import userRepo from "./Db/userRepo";
import {
  UserAttributes,
  findReturnAttributes,
  createReturnAttributes,
} from "./Interfaces";

class authRepo {
  async findEmail(email: string): Promise<findReturnAttributes | null> {
    try {
      if (!email) {
        logger.warn("no data passed to repo");
        return null;
      }

      const findEmail: findReturnAttributes | null = await userRepo.find(email);

      if (findEmail) {
        return findEmail;
      }
      return null;
    } catch (err) {
      const error = err as Error;
      logger.error(`Error at the findEmail authrepo: ${error.message}`);
      throw err;
    }
  }

  async newAccount(
    data: UserAttributes
  ): Promise<createReturnAttributes | null> {
    try {
      const { email, username, password, role, verified } = data;
      if (!email || !username || !password || !role) {
        logger.warn("Invalid data provided for new account creation");
        return null;
      }

      const newAccount: createReturnAttributes = await userRepo.create({
        email,
        username,
        password,
        role,
        verified,
      });

      if (newAccount) {
        return newAccount;
      }
      return null;
    } catch (err) {
      const error = err as Error;
      logger.error(`Error at the newAccount authrepo: ${error.message}`);
      throw err;
    }
  }
  async verify(id: number): Promise<Array<number>> {
    try {
      if (!id) {
        logger.warn("Invalid data provided for validate account");
      }
      const verify: Array<number> | [] = await userRepo.verify(id);

      if (verify) {
        return verify;
      }
      return [];
    } catch (err) {
      const error = err as Error;
      logger.error(`Error at the verify authrepo: ${error.message}`);
      throw err;
    }
  }
}
export default new authRepo();
