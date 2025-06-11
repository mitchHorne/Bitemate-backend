import Router from "@koa/router";
import multer from "koa-multer";

import { getPosts } from "../posts";

const router = new Router();
const upload = multer();

router.post("/posts", upload.any(), async (ctx) => {
  try {
    const { page = 1 } = ctx.query;
    const res = await getPosts(page);
    ctx.status = 200;
    ctx.body = { posts: res, pageCount: page };
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
    ctx.body = error.message;
  }
});

export default router;
