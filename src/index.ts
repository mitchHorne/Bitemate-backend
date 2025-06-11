import "dotenv/config";
import { config } from "dotenv-safe";
import sourceMap from "source-map-support";

import Koa from "koa";
import formidable from "formidable";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";

import router from "./routers";

import { formatPostData } from "./utils/format";

// Initialize the database
import "./database";

// Dotenv safe config
config();

// Source map support
sourceMap.install({ handleUncaughtExceptions: true });

const app = new Koa();
app.use(logger());
app.use(async (ctx, next) => {
  if (ctx.url === "/api/v1/posts/" && ctx.method.toLowerCase() === "post") {
    const form = formidable({});

    // not very elegant, but that's for now if you don't want to use `koa-better-body`
    // or other middlewares.
    const success = await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }

        const postData = formatPostData(fields);
        if (!postData) return resolve(false);

        ctx.state.formData = { data: postData, files: files };
        resolve(true);
      });
    });

    if (!success) {
      console.error("Error parsing form data:");
      ctx.status = 400;
      ctx.body = JSON.stringify({ error: "Invalid form data" });
    }

    return await next();
  } else {
    return await next();
  }
});
app.use(bodyParser());
app.use(router.routes());

app.listen(3000);
console.log("Server started on port 3000");
