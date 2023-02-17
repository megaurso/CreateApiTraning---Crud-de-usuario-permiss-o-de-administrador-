import { z } from "zod/lib"
import createLoginSchemas from "../schemas/login.schemas"


type LoginRequest = z.infer<typeof createLoginSchemas>

export{
    LoginRequest
}