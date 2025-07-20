import { z } from "zod";

export const LikePostBodySchema = z.object({ post: z.string() });
export const PostCommentBodySchema = z.object({
  post: z.string(),
  comment: z.string(),
});
export const LikePostCommentBodySchema = z.object({ comment: z.string() });

export const FiltersSchema = z
  .object({
    countries: z
      .array(
        z.object({
          code: z.string(),
          id: z.string(),
          name: z.string(),
        })
      )
      .optional(),
    difficulty: z.string().optional(),
    filters: z.array(z.string()).optional(),
    ingredientExclude: z.array(z.string()).optional(),
    ingredientInclude: z.array(z.string()).optional(),
    isTraditional: z.boolean().optional(),
  })
  .optional();
export const SearchedPostsBody = z.object({
  page: z.number().min(1).default(1),
  searchText: z.string(),
  filters: FiltersSchema,
});

export type Filters = z.infer<typeof FiltersSchema>;
