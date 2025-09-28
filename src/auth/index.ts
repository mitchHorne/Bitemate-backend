import { Context, Next } from "koa";
import { sign, verify } from "jsonwebtoken";

import Users from "../database/models/User";
// import { decrypt } from "../utils/encryption";
// import { authorizeModules, authorizePermissions } from "./utils";
// import { StringSchema } from "../types";
import { tokenSchema, Token } from "../types/auth";

const { JWT_SECRET } = process.env;

export async function authenticate(ctx: Context, next: Next) {
  console.log("Authenticating");
  const allowedPaths = ["/api/v1/users/login/", "/api/v1/users/signup/"];
  if (allowedPaths.includes(ctx.path)) {
    return await next();
  }

  const secret = String(JWT_SECRET);
  const token = ctx.headers["authorization"]?.split(" ")[1];

  if (!token) {
    ctx.status = 401;
    ctx.body = "Unauthorized";
    return;
  }

  try {
    const decodedAuthToken = await new Promise((resolve, reject) => {
      verify(token, secret, (err, token) => {
        if (err) reject(err);
        else resolve(token);
      });
    });

    const user = await Users.findAll({
      where: { id: (decodedAuthToken as Token).id },
    });

    console.log("Authenticating");
    console.log(user);

    if (!user || !user.length) {
      ctx.status = 401;
      ctx.body = "Unauthorized";
      return;
    }

    ctx.state.user = decodedAuthToken;
    return await next();
  } catch (error) {
    console.log(error);
    ctx.status = 401;
    return (ctx.body = "Unauthorized");
  }
}

// async function authorize(ctx: Context, next: Next) {
//   const { success, data: user } = AuthUserSchema.safeParse(ctx.state.user);

//   if (!success) {
//     ctx.status = 401;
//     ctx.body = "Unauthorized";
//     return;
//   }

//   const { allowedModules, permissions } = user;
//   const calledModule = ctx.request.path;

//   const allowedForModule = authorizeModules(allowedModules, calledModule);

//   if (!allowedForModule) {
//     ctx.status = 403;
//     return (ctx.body = "Forbidden");
//   }

//   const method = ctx.request.method.toLowerCase();
//   const hasNeededPermissions = authorizePermissions(
//     permissions,
//     method,
//     calledModule
//   );

//   if (!hasNeededPermissions) {
//     ctx.status = 403;
//     ctx.body = "Forbidden";
//     return;
//   }

//   await next();
// }

// function refreshToken(
//   token: string
// ): { authToken: string; user: Token } | false {
//   const { success, data: jwtSecret } = StringSchema.safeParse(JWT_SECRET);

//   if (!success) return false;

//   try {
//     const decodedToken = verify(token, jwtSecret);
//     const { success, data: verifiedDecodedToken } =
//       tokenSchema.safeParse(decodedToken);

//     if (!success) return false;

//     const authToken = sign(verifiedDecodedToken, JWT_SECRET || "secret", {
//       expiresIn: "1d",
//     }) as string;

//     return { authToken, user: verifiedDecodedToken };
//   } catch (error) {
//     return false;
//   }
// }

async function login(
  email: string,
  password: string
): Promise<{ token: string; user: Token }> {
  const dbUser = await Users.findOne({
    where: { email },
    attributes: ["id", "email", "password"],
  });

  if (!dbUser) throw new Error("Failed sign in");

  if (dbUser.dataValues.password !== password)
    throw new Error("Failed sign in");

  const user = { id: dbUser.id, email: dbUser.dataValues.email };

  const { success, data: verifiedUser } = tokenSchema.safeParse(user);

  if (!success) throw new Error("Failed sign in");

  const token = sign(verifiedUser, JWT_SECRET || "secret", {
    expiresIn: "720h",
  }) as string;

  return { token, user: verifiedUser };
}

export { login };
