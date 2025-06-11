import { z } from "zod";

export const StringSchema = z.string();
export const BooleanSchema = z.boolean();
export const ArraySchema = z.array(z.string());
