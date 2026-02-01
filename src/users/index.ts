import { login } from "../auth";
import { v4 as uuidv4 } from "uuid";

import Follows from "../database/models/Follows";
import Profile from "../database/models/Profile";
import Post from "../database/models/Post";
import User from "../database/models/User";

import { SignInSchema } from "../types/auth";
import { uploadImage } from "../image";

export const createUser = async (userData: any) => {
  return User.create(
    { ...userData, profile: { username: userData.email } },
    { include: [Profile] },
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

export const getOtherUser = async (id: string) => {
  const userData = await User.findOne({
    attributes: { exclude: ["password"] },
    include: [Profile, { model: Post, as: "posts" }],
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

export const updateUser = async (id: string, formData: any) => {
  const { data, files } = formData;

  const user = await User.findOne({
    include: [Profile],
    where: { id },
  });

  if (!user) return null;

  if (files.profilePhoto) {
    const image = files.profilePhoto[0];

    const ext = image.mimetype.split("/")[1] === "jpeg" ? "jpg" : "png";
    const name = `${uuidv4()}.${ext}`;
    await uploadImage(name, image);
    user.profile.update({ profilePhoto: name });
  }

  user.update({ name: data.name });
  user.profile.update({
    bio: data.bio,
    country: data.country,
    username: data.username,
  });

  // await user.profile.update({ ...data, profilePhoto: url });
  await user.save();

  return user.toJSON();
};
