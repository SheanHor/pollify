import {z} from "zod"

export const emailSignupSchema = z.object({
    emailAddress:z.string().min(1,{message:"Email is required."}).email(),
    userName:z.string().min(1,{message:"Username is required."}),
    password:z.string().min(6, {message:"Password must be at least 6 characters."})
})

export type EmailSignupSchema = z.infer<typeof emailSignupSchema>