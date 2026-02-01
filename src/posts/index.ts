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
import { Filters } from "../types/posts/router";

import { Op } from "sequelize";
import { uploadImage } from "../image";
import { createPresignedUrl } from "../video";

export const createPost = async (postData: any) => {
  const image = postData.files.image0[0];
  const video = postData.files.videos0[0];

  const imageExt = image.mimetype.split("/")[1] === "jpeg" ? "jpg" : "png";
  const imageName = `${uuidv4()}.${imageExt}`;
  await uploadImage(imageName, image);

  let presignedUrl = null;
  const videoName = `${uuidv4()}.${video.mimetype.split("/")[1]}`;
  if (video) presignedUrl = await createPresignedUrl(videoName, video.mimetype);

  await Post.create({
    ...postData.data,
    imageUrl: imageName,
    videoUrl: videoName,
  });

  console.log("Presigned URL:", presignedUrl);
  return { presignedUrl, videoType: video.mimetype };
};

export const createRegularPost = async (postData: any) => {
  const image = postData.files.image0[0];
  const video = postData.files.video0[0];

  const imageExt = image.mimetype.split("/")[1] === "jpeg" ? "jpg" : "png";
  const imageName = `${uuidv4()}.${imageExt}`;
  await uploadImage(imageName, image);

  const videoExt = video.mimetype.split("/")[1] === "mp4" ? "mp4" : "webm";
  const videoName = `${uuidv4()}.${videoExt}`;
  // const { url: videoUrl } = await uploadVideo(videoName, video);

  await Post.create({ ...postData.data, imageUrl: imageName, videoUrl });
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

export const getCountryPosts = async (country: string) => {
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
    limit: 3,
    order: [["createdAt", "DESC"]],
    where: { country },
  });

  return posts.map((post) => post.toJSON());
};

export const getSearchedPosts = async (
  page: number,
  searchText: string,
  filters: Filters,
) => {
  const searchObjects = searchText
    ? {
        [Op.or]: [
          { foodName: { [Op.like]: `%${searchText}%` } },
          { foodNameNative: { [Op.like]: `%${searchText}%` } },
          { description: { [Op.like]: `%${searchText}%` } },
          { ingredients: { [Op.like]: `%${searchText}%` } },
        ],
      }
    : [];

  const countries = filters?.countries?.length
    ? filters.countries.map((country) => country.id)
    : null;
  const difficulty = filters?.difficulty || null;
  const ingredientInclude = filters?.ingredientInclude?.length
    ? filters?.ingredientInclude
    : null;
  const ingredientExclude = filters?.ingredientExclude?.length
    ? filters?.ingredientExclude
    : null;
  const isTraditional = filters?.isTraditional || null;

  const filterObjects = [
    countries ? { country: { [Op.in]: countries } } : null,
    difficulty ? { difficulty } : null,
    ingredientInclude
      ? { ingredients: { [Op.like]: `%${ingredientInclude.join("%")}%` } }
      : null,
    ingredientExclude
      ? { ingredients: { [Op.notLike]: `%${ingredientExclude.join("%")}%` } }
      : null,
    isTraditional !== null ? { isTraditional } : null,
  ];

  const filteredFilterObjects = filterObjects.filter(
    (filter) => filter !== null,
  );

  const finalFilterObject = filteredFilterObjects.length
    ? {
        [Op.and]: filteredFilterObjects,
      }
    : {};

  const whereClause = {
    ...searchObjects,
    ...finalFilterObject,
  };

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
      ...whereClause,
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
