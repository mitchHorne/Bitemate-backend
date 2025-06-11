import Router from "@koa/router";

import { explorePath, postsPath, usersPath } from "./constants";

import ExploreRouter from "./explore";
import PostsRouter from "./posts";
import UserRouter from "./users";

import { authenticate } from "../auth";

const router = new Router();

router.use(explorePath, ExploreRouter.routes());
router.use(postsPath, authenticate, PostsRouter.routes());
router.use(usersPath, UserRouter.routes());

export default router;
