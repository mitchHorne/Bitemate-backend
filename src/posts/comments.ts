import Comments from "../database/models/PostComment";
import CommentDislikes from "../database/models/CommentDownvote";
import CommentLikes from "../database/models/CommentUpvote";
import DownvotePost from "../database/models/Downvote";
import Post from "../database/models/Post";
import Profile from "../database/models/Profile";
import UpvotePost from "../database/models/Upvote";
import User from "../database/models/User";

export const createComment = async (
  postId: string,
  userId: string,
  comment: string
): Promise<Comments> => {
  try {
    await Comments.create({ postId, userId, comment });

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
          as: "comments",
          order: [["createdAt", "DESC"]],
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
  } catch (error: any) {
    console.error("Error creating comment:", error.message);
    throw new Error("Failed to create comment");
  }
};

export const likeComment = async (
  userId: string,
  commentId: string
): Promise<Comments> => {
  try {
    const comment = await Comments.findOne({
      where: { id: commentId },
    });
    if (!comment) throw new Error("Comment not found");

    const existingLike = await CommentLikes.findOne({
      where: { postCommentId: commentId, userId },
    });
    const existingDislike = await CommentDislikes.findOne({
      where: { postCommentId: commentId, userId },
    });

    if (existingLike) {
      await existingLike.destroy();
    } else {
      if (existingDislike) await existingDislike.destroy();
      await CommentLikes.create({ postCommentId: commentId, userId });
    }

    const newPost = await Post.findOne({
      where: { id: comment.postId },
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
          as: "comments",
          order: [["createdAt", "DESC"]],
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
  } catch (error: any) {
    console.error("Error creating comment:", error.message);
    throw new Error("Failed to create comment");
  }
};

export const dislikeComment = async (
  userId: string,
  commentId: string
): Promise<Comments> => {
  try {
    const comment = await Comments.findOne({
      where: { id: commentId },
    });
    if (!comment) throw new Error("Comment not found");

    const existingLike = await CommentLikes.findOne({
      where: { postCommentId: commentId, userId },
    });
    const existingDislike = await CommentDislikes.findOne({
      where: { postCommentId: commentId, userId },
    });

    if (existingDislike) {
      await existingDislike.destroy();
    } else {
      if (existingLike) await existingLike.destroy();
      await CommentDislikes.create({ postCommentId: commentId, userId });
    }

    console.log(comment);
    console.log(comment.postId);

    const newPost = await Post.findOne({
      where: { id: comment.postId },
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
          as: "comments",
          order: [["createdAt", "DESC"]],
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
  } catch (error: any) {
    console.error("Error creating comment:", error.message);
    throw new Error("Failed to create comment");
  }
};

dislikeComment;
likeComment;
