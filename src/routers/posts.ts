import Router from "@koa/router";
import multer from "koa-multer";

import {
  createComment,
  createPost,
  createRegularPost,
  dislikeComment,
  dislikePost,
  likeComment,
  likePost,
  getSearchedPosts,
  getCountryPosts,
} from "../posts";

import {
  LikePostBodySchema,
  LikePostCommentBodySchema,
  PostCommentBodySchema,
  SearchedPostsBody,
} from "../types/posts/router";

const router = new Router();
const upload = multer();

router.post("/", upload.any(), async (ctx) => {
  try {
    const res = await createPost(ctx.state.formData);
    ctx.status = 200;
    ctx.body = res;
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
    ctx.body = error.message;
  }
});

router.get("/country/:country", async (ctx) => {
  try {
    const { country } = ctx.params;
    const res = await getCountryPosts(country);
    console.log(res);
    ctx.status = 200;
    ctx.body = res;
  } catch (err: any) {
    console.error(err.message);
    ctx.status = 500;
    ctx.body = err.message;
  }
});

router.post("/regular", upload.any(), async (ctx) => {
  try {
    await createRegularPost(ctx.state.formData);
    ctx.status = 200;
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
    ctx.body = error.message;
  }
});

router.post("/search", async (ctx) => {
  try {
    const { body } = ctx.request;
    const { success, data, error } = SearchedPostsBody.safeParse(body);

    if (!success) {
      ctx.status = 400;
      ctx.body = "Invalid search data";
      return;
    }

    const { page, searchText, filters } = data;

    const posts = await getSearchedPosts(page, searchText, filters);
    ctx.status = 200;
    ctx.body = { posts };
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
    ctx.body = error.message;
  }
});

router.post("/like-post", async (ctx) => {
  try {
    const { success, data: body } = LikePostBodySchema.safeParse(
      ctx.request.body,
    );

    if (!success) {
      ctx.status = 400;
      ctx.body = "Invalid post ID";
      return;
    }

    const userId = ctx.state.user.id;
    const res = await likePost(body.post, userId);
    ctx.status = 200;
    ctx.body = res;
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
  }
});

router.post("/dislike-post", async (ctx) => {
  try {
    const { success, data: body } = LikePostBodySchema.safeParse(
      ctx.request.body,
    );

    if (!success) {
      ctx.status = 400;
      ctx.body = "Invalid post ID";
      return;
    }

    const userId = ctx.state.user.id;
    const res = await dislikePost(body.post, userId);
    ctx.status = 200;
    ctx.body = res;
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
    ctx.body = error.message;
  }
});

router.post("/post-comment", async (ctx) => {
  try {
    const { success, data: body } = PostCommentBodySchema.safeParse(
      ctx.request.body,
    );

    if (!success) {
      ctx.status = 400;
      ctx.body = "Invalid post ID and comment";
      return;
    }

    const { post, comment } = body;
    const userId = ctx.state.user.id;
    const res = await createComment(post, userId, comment);
    console.log(res);
    ctx.status = 200;
    ctx.body = res;
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
    ctx.body = error.message;
  }
});

router.post("/like-comment", async (ctx) => {
  try {
    const { success, data: body } = LikePostCommentBodySchema.safeParse(
      ctx.request.body,
    );

    if (!success) {
      ctx.status = 400;
      ctx.body = "Invalid comment";
      return;
    }

    const { comment } = body;
    const userId = ctx.state.user.id;
    const res = await likeComment(userId, comment);
    ctx.status = 200;
    ctx.body = res;
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
    ctx.body = error.message;
  }
});

router.post("/dislike-comment", async (ctx) => {
  try {
    const { success, data: body } = LikePostCommentBodySchema.safeParse(
      ctx.request.body,
    );

    if (!success) {
      ctx.status = 400;
      ctx.body = "Invalid comment";
      return;
    }

    const { comment } = body;
    const userId = ctx.state.user.id;
    const res = await dislikeComment(userId, comment);
    ctx.status = 200;
    ctx.body = res;
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
    ctx.body = error.message;
  }
});

export default router;
