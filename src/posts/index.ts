import { v4 as uuidv4 } from "uuid";
import Comments from "../database/models/PostComment";
import CommentLikes from "../database/models/CommentUpvote";
import CommentDislikes from "../database/models/CommentDownvote";
import DownvotePost from "../database/models/Downvote";
import Follows from "../database/models/Follows";
import Post from "../database/models/Post";
import Profile from "../database/models/Profile";
import UpvotePost from "../database/models/Upvote";
import User from "../database/models/User";

import { Op } from "sequelize";
import { uploadImage } from "../image";

export const createPost = async (postData: any) => {
  const image = postData.files.image0[0];

  const ext = image.mimetype.split("/")[1] === "jpeg" ? "jpg" : "png";
  const name = `${uuidv4()}.${ext}`;
  const { url } = await uploadImage(name, image);

  await Post.create({ ...postData.data, imageUrl: url });
};

export const createRegularPost = async (postData: any) => {
  const image = postData.files.image0[0];

  const ext = image.mimetype.split("/")[1] === "jpeg" ? "jpg" : "png";
  const name = `${uuidv4()}.${ext}`;
  const { url } = await uploadImage(name, image);

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
      {
        model: User,
        attributes: { exclude: ["password"] },
        include: [{ model: Profile }],
      },
      { model: DownvotePost, as: "dislikes" },
      { model: UpvotePost, as: "likes" },
      {
        model: Comments,
        order: [["createdAt", "DESC"]],
        as: "comments",
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
            as: "user",
            include: [{ model: Profile }],
          },
          {
            model: CommentLikes,
            as: "likes",
          },
          {
            model: CommentDislikes,
            as: "dislikes",
          },
        ],
      },
    ],
    limit: 100,
    offset: (page - 1) * 100,
    order: [["createdAt", "DESC"]],
  });

  return posts.map((post) => post.toJSON());
};

export const getSearchedPosts = async (page: number, searchText: string) => {
  const posts = await Post.findAll({
    include: [
      {
        model: User,
        attributes: { exclude: ["password"] },
        include: [{ model: Profile }],
      },
      { model: DownvotePost, as: "dislikes" },
      { model: UpvotePost, as: "likes" },
      {
        model: Comments,
        order: [["createdAt", "DESC"]],
        as: "comments",
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
            as: "user",
            include: [{ model: Profile }],
          },
          {
            model: CommentLikes,
            as: "likes",
          },
          {
            model: CommentDislikes,
            as: "dislikes",
          },
        ],
      },
    ],
    limit: 100,
    offset: (page - 1) * 100,
    order: [["createdAt", "DESC"]],
    where: {
      [Op.or]: [
        { foodName: { [Op.like]: `%${searchText}%` } },
        { foodNameNative: { [Op.like]: `%${searchText}%` } },
        { description: { [Op.like]: `%${searchText}%` } },
        { ingredients: { [Op.like]: `%${searchText}%` } },
      ],
    },
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
      {
        model: User,
        attributes: { exclude: ["password"] },
        include: [{ model: Profile }],
      },
      { model: DownvotePost, as: "dislikes" },
      { model: UpvotePost, as: "likes" },
      {
        model: Comments,
        order: [["createdAt", "DESC"]],
        as: "comments",
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
            as: "user",
            include: [{ model: Profile }],
          },
          {
            model: CommentLikes,
            as: "likes",
          },
          {
            model: CommentDislikes,
            as: "dislikes",
          },
        ],
      },
    ],
  });

  if (!newPost) throw new Error("Post not found");

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
      {
        model: User,
        attributes: { exclude: ["password"] },
        include: [{ model: Profile }],
      },
      { model: DownvotePost, as: "dislikes" },
      { model: UpvotePost, as: "likes" },
      {
        model: Comments,
        order: [["createdAt", "DESC"]],
        as: "comments",
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
            as: "user",
            include: [{ model: Profile }],
          },
          {
            model: CommentLikes,
            as: "likes",
          },
          {
            model: CommentDislikes,
            as: "dislikes",
          },
        ],
      },
    ],
  });

  if (!newPost) throw new Error("Post not found");

  return newPost.toJSON();
};

export { createComment, dislikeComment, likeComment } from "./comments";
