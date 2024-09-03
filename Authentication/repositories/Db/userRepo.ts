import { userModel } from "../../../models/userModel";

import {UserAttributes, findReturnAttributes, createReturnAttributes } from '../Interfaces'

class userRepo {
  async find(email: string): Promise<findReturnAttributes | null> {
    const userInstance = await userModel.findOne({
      where: { email },
      attributes: ["id", "email", "password", "username", "role", "verified"],
    });
    return userInstance ? (userInstance.get() as findReturnAttributes) : null;
  }

  async create(data: UserAttributes): Promise<createReturnAttributes> {
    const userInstance = await userModel.create(data);
    const { id, email, username } = userInstance.get();
    // Return the filtered data
    return { id, email, username };
  }

  async updatePassword(
    hashPassword: string,
    email: string
  ): Promise<Array<number>> {
    return await userModel.update(
      { password: hashPassword },
      { where: { email: email } }
    );
  }

  async verify(id: number): Promise<Array<number>> {
    return await userModel.update(
      { verified: true },
      {
        where: { id: id },
      }
    );
  }
}
export default new userRepo();
