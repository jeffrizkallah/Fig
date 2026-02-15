import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  companyWebsite: z.string().optional(),
  companySize: z.string().min(1, "Please select a company size"),
  annualRevenue: z.string().optional(),
  projectBudget: z.string().min(1, "Please select a project budget"),
  servicesInterested: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
