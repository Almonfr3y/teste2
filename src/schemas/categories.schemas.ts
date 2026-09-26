import {z} from "zod";

export const CategorySchema = z.object({
    name: z.string().min(2, {message: "O nome deve ter ao menos dois caracteres"}),
});

export type CreateCategoryInput = z.infer<typeof CategorySchema>;