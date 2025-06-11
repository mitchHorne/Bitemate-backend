import { uuid } from "uuidv4";

import DownvotePost from "../database/models/Downvote";
import Post from "../database/models/Post";
import UpvotePost from "../database/models/Upvote";
import User from "../database/models/User";

import { uploadImage } from "../image";

export const createPost = async (postData: any) => {
  const image = postData.files.image0[0];

  const ext = image.mimetype.split("/")[1] === "jpeg" ? "jpg" : "png";
  const name = `${uuid()}.${ext}`;
  const { id, url } = await uploadImage(name, image);

  await Post.create({ ...postData.data, imageUrl: url });
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

export const getPosts = async (page: number) => {
  const posts = await Post.findAll({
    include: [
      { model: User, attributes: { exclude: ["password"] } },
      { model: DownvotePost, as: "dislikes" },
      { model: UpvotePost, as: "likes" },
    ],
    limit: 10,
    offset: (page - 1) * 10,
    order: [["createdAt", "DESC"]],
  });

  return posts.map((post) => post.toJSON());
};

export const likePost = async (postId: string, userId: string) => {
  const post = await Post.findByPk(postId);
  if (!post) throw new Error("Post not found");

  const existingLike = await UpvotePost.findOne({
    where: { postId, userId },
  });
  const existingDislike = await DownvotePost.findOne({
    where: { postId, userId },
  });

  if (existingLike) {
    await existingLike.destroy();
  } else {
    if (existingDislike) await existingDislike.destroy();
    await UpvotePost.create({ postId, userId });
  }

  const newPost = await Post.findOne({
    where: { id: postId },
    include: [
      { model: User, attributes: { exclude: ["password"] } },
      { model: DownvotePost, as: "dislikes" },
      { model: UpvotePost, as: "likes" },
    ],
  });

  return newPost.toJSON();
};

export const dislikePost = async (postId: string, userId: string) => {
  const post = await Post.findByPk(postId);
  if (!post) throw new Error("Post not found");

  const existingDislike = await DownvotePost.findOne({
    where: { postId, userId },
  });
  const existingLike = await UpvotePost.findOne({
    where: { postId, userId },
  });

  if (existingDislike) {
    await existingDislike.destroy();
  } else {
    if (existingLike) await existingLike.destroy();
    await DownvotePost.create({ postId, userId });
  }

  const newPost = await Post.findOne({
    where: { id: postId },
    include: [
      { model: User, attributes: { exclude: ["password"] } },
      { model: DownvotePost, as: "dislikes" },
      { model: UpvotePost, as: "likes" },
    ],
  });

  return newPost.toJSON();
};
