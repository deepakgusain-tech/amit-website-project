import z from "zod";
import { bannerSchema, enquirySchema, newsletterSchema, serviceCategorySchema, serviceSchema, userSchema } from "../validators";

export type User = z.infer<typeof userSchema>
export type Banner = z.infer<typeof bannerSchema>
export type Enquiry = z.infer<typeof enquirySchema>
export type ServiceCategory = z.infer<typeof serviceCategorySchema>
export type Service = z.infer<typeof serviceSchema>
export type Newsletter = z.infer<typeof newsletterSchema>



