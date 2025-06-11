import { login } from "../auth";

import Follows from "../database/models/Follows";
import Profile from "../database/models/Profile";
import User from "../database/models/User";

import { SignInSchema } from "../types/auth";

export const createUser = async (userData: any) => {
  return User.create(
    { ...userData, profile: { username: userData.email } },
    { include: [Profile] }
  );
};

export const getUser = async (id: string) => {
  const userData = await User.findOne({
    attributes: { exclude: ["password"] },
    include: [
      Profile,
      {
        model: Follows,
        as: "followers",
        attributes: ["followerId" as "id"],
      },
      {
        model: Follows,
        as: "following",
        attributes: ["followingId" as "id"],
      },
    ],
    where: { id },
  });

  return userData?.toJSON();
};

export const loginUser = async (data: any) => {
  const { success, data: userData } = SignInSchema.safeParse(data);

  if (!success) throw new Error("Invalid user data");

  console.log(userData.email, userData.password);
  return await login(userData.email, userData.password);
};
