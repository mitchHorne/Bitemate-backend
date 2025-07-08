import { z } from "zod";

export const LikePostBodySchema = z.object({ post: z.string() });
export const PostCommentBodySchema = z.object({
  post: z.string(),
  comment: z.string(),
});
export const LikePostCommentBodySchema = z.object({ comment: z.string() });
export const SearchedPostsBody = z.object({
  page: z.number().min(1).default(1),
  searchText: z.string().min(1),
});
