import Router from "@koa/router";

import { explorePath, postsPath, usersPath, recipesPath } from "./constants";

import ExploreRouter from "./explore";
import PostsRouter from "./posts";
import UserRouter from "./users";
import RecipesRouter from "./recipes";

import { authenticate } from "../auth";

const router = new Router();

router.use(explorePath, authenticate, ExploreRouter.routes());
router.use(postsPath, authenticate, PostsRouter.routes());
router.use(usersPath, authenticate, UserRouter.routes());
// router.use(recipesPath, authenticate, RecipesRouter.routes());
router.use(recipesPath, RecipesRouter.routes());

export default router;
