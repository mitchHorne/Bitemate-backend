import { z } from "zod";

export const LikePostBodySchema = z.object({ post: z.string() });
export const PostCommentBodySchema = z.object({
  post: z.string(),
  comment: z.string(),
});
export const LikePostCommentBodySchema = z.object({ comment: z.string() });
