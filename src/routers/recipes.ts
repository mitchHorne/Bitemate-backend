import Router from "@koa/router";
import { extractRecipeFromUrl } from "../recipes";

const router = new Router();

router.post("/extract", async (ctx) => {
  try {
    const { url } = ctx.request.body as { url: string };

    if (!url) {
      ctx.status = 400;
      ctx.body = { error: "URL is required" };
      return;
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      ctx.status = 400;
      ctx.body = { error: "Invalid URL format" };
      return;
    }

    const recipeData = await extractRecipeFromUrl(url);

    if (!recipeData) {
      ctx.status = 404;
      ctx.body = { error: "No recipe found at the provided URL" };
      return;
    }

    ctx.status = 200;
    ctx.body = recipeData;
  } catch (error: any) {
    console.error("Recipe extraction error:", error.message);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

export default router;
