import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  role: z.enum(["ADMIN", "SELLER", "STOCK"]).default("SELLER"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Senha é obrigatória"),
});