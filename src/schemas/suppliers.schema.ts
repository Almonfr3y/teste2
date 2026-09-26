import {z} from "zod";
import { CategorySchema } from "./categories.schemas";

export const SuppliersSchema = z.object({
    name: z.string(),
    email: z.string().email({message: "Email inválido"}).optional(),
    phone: z.string().length(11, "O telefone precisa ter 11 digitos").optional(),
    document: z.string().regex(/^\d{11}$|^\d{2}$/, {message: "Documento inválido"}).optional(),
});

export type SuppliersInput = z.infer<typeof SuppliersSchema>;