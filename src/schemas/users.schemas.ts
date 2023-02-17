import { hashSync } from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().max(45),
  password: z.string().transform((pass)=>{
    return hashSync(pass,10)
  }),
  email: z.string().email(),
  admin: z.boolean().default(false),
  active: z.boolean().default(true),
});

const returnUserSchema = createUserSchema.extend({
  id: z.number(),
});

const returnUserSchemaWithOutPassword = returnUserSchema.omit({
  password: true,
});

const updateSchema = z.object({
  name: z.string().max(45).optional(),
  email: z.string().email().optional(),
  password: z.string().transform((pass)=>{
    return hashSync(pass,10)
  }).optional()
})

const returnSchemaAllUserWithOutPassword = returnUserSchemaWithOutPassword.array()
export { createUserSchema, returnUserSchema,returnUserSchemaWithOutPassword,returnSchemaAllUserWithOutPassword,updateSchema };
