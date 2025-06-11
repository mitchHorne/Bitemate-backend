import Router from "@koa/router";
import multer from "koa-multer";

import { createPost, dislikePost, likePost } from "../posts";

const router = new Router();
const upload = multer();

router.post("/", upload.any(), async (ctx) => {
  try {
    await createPost(ctx.state.formData);
    ctx.status = 200;
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
    ctx.body = error.message;
  }
});

router.post("/like-post", async (ctx) => {
  try {
    const postId = ctx.request.body.post;
    const userId = ctx.state.user.id;
    const res = await likePost(postId, userId);
    ctx.status = 200;
    ctx.body = res;
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
  }
});

router.post("/dislike-post", async (ctx) => {
  try {
    const postId = ctx.request.body.post;
    const userId = ctx.state.user.id;
    const res = await dislikePost(postId, userId);
    ctx.status = 200;
    ctx.body = res;
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
    ctx.body = error.message;
  }
});

export default router;
