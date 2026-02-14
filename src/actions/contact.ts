"use server";

import { contactSchema, type ContactFormData } from "@/lib/schemas";

export async function submitContact(data: ContactFormData) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data. Please check your inputs." };
  }

  // Log the submission (replace with Resend email later)
  console.log("=== New Contact Form Submission ===");
  console.log("Name:", parsed.data.name);
  console.log("Email:", parsed.data.email);
  console.log("Company:", parsed.data.company || "Not provided");
  console.log("Message:", parsed.data.message);
  console.log("===================================");

  // Simulate a small delay for realism
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { success: true };
}
