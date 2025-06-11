import { z } from "zod";

import { UserSchema, PermissionsSchema } from "../users";
// import { resetPassword } from "../../users";

export const AuthUserSchema = UserSchema.omit({
  id: true,
  email: true,
  password: true,
  resetPassword: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const tokenSchema = z.object({ id: z.string(), email: z.string() });

export type Token = z.infer<typeof tokenSchema>;
