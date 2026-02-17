import { z } from "zod";

export const InitPasswordResetSchema = z.object({
  temporaryPassword: z.string(),
});

const permissions: readonly [string, ...string[]] = [
  "all",
  "employees",
  "statutoryTraining",
  "users",
];

export const PermissionSchema = z.object({
  superUser: z.boolean().optional(),
  read: z.boolean().optional(),
  write: z.boolean().optional(),
  delete: z.boolean().optional(),
});

export const PermissionsSchema = z.record(
  z.enum(permissions),
  PermissionSchema,
);

export const ResetPasswordSchema = z.object({
  email: z.string(),
  newPassword: z.string(),
  temporaryPassword: z.string(),
});

const companies: readonly [string, ...string[]] = ["all", "cis", "structaTech"];

export const CompanySchema = z.enum(companies);

const allowedModules: readonly [string, ...string[]] = [
  "all",
  "employees",
  "statutoryTraining",
  "users",
];

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  company: z.enum(companies),
  allowedModules: z.array(z.enum(allowedModules)),
  permissions: PermissionsSchema,
  resetPassword: z.boolean(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deletedAt: z.date().optional(),
});

export const UserCreateBodySchema = UserSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  deletedAt: true,
  resetPassword: true,
});

export const UserUpdateBodySchema = UserSchema.omit({
  id: true,
  password: true,
  created_at: true,
  updated_at: true,
  deletedAt: true,
  resetPassword: true,
});

/* Base Types */
export type Company = z.infer<typeof CompanySchema>;
export type Permission = z.infer<typeof PermissionSchema>;
export type Permissions = z.infer<typeof PermissionsSchema>;
export type UserAttributes = z.infer<typeof UserSchema>;

/* Request payload bodies */
export type UserCreateBody = z.infer<typeof UserCreateBodySchema>;
export type UserUpdateBody = z.infer<typeof UserUpdateBodySchema>;
export type InitPasswordResetBody = z.infer<typeof InitPasswordResetSchema>;
export type ResetPasswordBody = z.infer<typeof ResetPasswordSchema>;
