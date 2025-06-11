import Router from "@koa/router";

import { createUser, getUser, loginUser } from "../users";

const router = new Router();

router.post("/", async (ctx) => {
  try {
    const user = ctx.request.body;
    await createUser(user);
    ctx.status = 201;
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
    ctx.body = error.message;
  }
});

router.get("/:id", async (ctx) => {
  const { id } = ctx.params;
  try {
    const user = await getUser(id);

    if (!user) return (ctx.status = 404);

    ctx.status = 200;
    ctx.body = user;
  } catch (error: any) {
    console.error(error.message);
    ctx.status = 500;
    ctx.body = error.message;
  }
});

router.post("/login", async (ctx) => {
  try {
    const user = ctx.request.body;
    console.log(user);
    const loginResponse = await loginUser(user);

    console.log(loginResponse);
    ctx.status = 200;
    ctx.body = loginResponse;
  } catch (error: any) {
    ctx.status = 401;
  }
});

router.post("/signup", async (ctx) => {
  try {
    const user = ctx.request.body;
    await createUser(user);
    ctx.status = 201;
  } catch (error: any) {}
});

export default router;
