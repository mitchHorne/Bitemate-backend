import Router from "@koa/router";
import multer from "koa-multer";

import { getPosts } from "../posts";

import { PageNumberSchema } from "../types/explore/router";

const router = new Router();
const upload = multer();

router.post("/posts", upload.any(), async (ctx) => {
  try {
    const { page = "1" } = ctx.query;
    const pageNumber = Number(page);

    const { success, data: verifiedPage } =
      PageNumberSchema.safeParse(pageNumber);

    if (!success || verifiedPage < 1) {
      ctx.status = 400;
      ctx.body = "Invalid page number";
      return;
    }

    const res = await getPosts(verifiedPage);
    ctx.status = 200;
    ctx.body = { posts: res, pageCount: page };
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
    ctx.body = error.message;
  }
});

export default router;
