import {z} from "zod"
import {formSchema} from "@/features/auth/signin/ui/signIn"

export type LoginRequestType = {
  email: string
  password: string
}

export type LoginResponseType = {
  "accessToken": "string"
}

export type FormSchemaType = z.infer<typeof formSchema>