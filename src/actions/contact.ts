"use server";

import { contactSchema, type ContactFormData } from "@/lib/schemas";

export async function submitContact(data: ContactFormData) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data. Please check your inputs." };
  }

  // Log the submission (replace with Resend email later)
  console.log("=== New Contact Form Submission ===");
  console.log("Name:", parsed.data.firstName, parsed.data.lastName);
  console.log("Email:", parsed.data.email);
  console.log("Company:", parsed.data.company);
  console.log("Role:", parsed.data.role);
  console.log("Company Website:", parsed.data.companyWebsite || "Not provided");
  console.log("Company Size:", parsed.data.companySize);
  console.log("Annual Revenue:", parsed.data.annualRevenue || "Not provided");
  console.log("Project Budget:", parsed.data.projectBudget);
  console.log("Services Interested:", parsed.data.servicesInterested);
  console.log("Message:", parsed.data.message || "Not provided");
  console.log("===================================");

  // Simulate a small delay for realism
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { success: true };
}
