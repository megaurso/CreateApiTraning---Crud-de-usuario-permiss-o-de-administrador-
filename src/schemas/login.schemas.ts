import { z } from "zod";

const createLoginSchemas = z.object({
    email: z.string().email(),
    password: z.string()
})

export default createLoginSchemas