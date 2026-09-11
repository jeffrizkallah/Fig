import { z } from "zod";

export const CONTACT_NEEDS = [
  "Custom software",
  "Dashboards",
  "AI solutions",
  "Integration",
  "Automation",
  "Websites",
  "Not sure yet",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Please tell us your name"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  needs: z
    .array(z.enum(CONTACT_NEEDS))
    .min(1, "Pick at least one, or choose Not sure yet"),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
