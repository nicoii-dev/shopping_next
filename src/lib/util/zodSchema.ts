import z from "zod";

/**
 * *Note:
 * It is essential to transform `isVerified` & `isKeepLoggedIn` to boolean
 * since next-auth structures its credentials k/v into string values
 */
export const ZodLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// * export type inference of Login schema
export type InferLoginSchema = z.infer<typeof ZodLoginSchema>;
