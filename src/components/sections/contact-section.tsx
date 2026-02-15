"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Send, CheckCircle2, Mail, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { submitContact } from "@/actions/contact";
import { fadeInUp } from "@/lib/animations";
import {
  COMPANY_SIZE_OPTIONS,
  ANNUAL_REVENUE_OPTIONS,
  PROJECT_BUDGET_OPTIONS,
  SERVICES_INTEREST_OPTIONS,
} from "@/lib/constants";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError("");
    const result = await submitContact(data);
    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-bg-secondary">
      <Container>
        <SectionHeading
          label="Get In Touch"
          title="Let's talk about your business."
          subtitle="Tell us what you're working with and where you want to go. We'll figure out the rest together."
        />

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl border border-border p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-text-primary mb-3">
                    Message sent!
                  </h3>
                  <p className="text-text-secondary">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours
                    to set up a time to chat.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white rounded-2xl border border-border p-8 space-y-6"
                >
                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      id="firstName"
                      placeholder="John"
                      {...register("firstName")}
                      error={errors.firstName?.message}
                    />
                    <Input
                      label="Last Name"
                      id="lastName"
                      placeholder="Doe"
                      {...register("lastName")}
                      error={errors.lastName?.message}
                    />
                  </div>

                  {/* Email & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Email"
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      {...register("email")}
                      error={errors.email?.message}
                    />
                    <Input
                      label="Role"
                      id="role"
                      placeholder="e.g. CEO, CTO, Marketing Director"
                      {...register("role")}
                      error={errors.role?.message}
                    />
                  </div>

                  {/* Company & Website */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Company"
                      id="company"
                      placeholder="Your company name"
                      {...register("company")}
                      error={errors.company?.message}
                    />
                    <Input
                      label="Company Website (optional)"
                      id="companyWebsite"
                      placeholder="https://yourcompany.com"
                      {...register("companyWebsite")}
                      error={errors.companyWebsite?.message}
                    />
                  </div>

                  {/* Company Size & Revenue */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Select
                      label="Company Size"
                      id="companySize"
                      placeholder="Select company size"
                      options={COMPANY_SIZE_OPTIONS}
                      {...register("companySize")}
                      error={errors.companySize?.message}
                    />
                    <Select
                      label="Annual Revenue (optional)"
                      id="annualRevenue"
                      placeholder="Select annual revenue"
                      options={ANNUAL_REVENUE_OPTIONS}
                      {...register("annualRevenue")}
                      error={errors.annualRevenue?.message}
                    />
                  </div>

                  {/* Budget & Services */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Select
                      label="Project Budget"
                      id="projectBudget"
                      placeholder="Select project budget"
                      options={PROJECT_BUDGET_OPTIONS}
                      {...register("projectBudget")}
                      error={errors.projectBudget?.message}
                    />
                    <Select
                      label="What services are you interested in?"
                      id="servicesInterested"
                      placeholder="Select a service"
                      options={SERVICES_INTEREST_OPTIONS}
                      {...register("servicesInterested")}
                      error={errors.servicesInterested?.message}
                    />
                  </div>

                  {/* Message */}
                  <Textarea
                    label="Additional Info / Message (optional)"
                    id="message"
                    placeholder="Tell us more about your project, timeline, or any specific requirements..."
                    {...register("message")}
                    error={errors.message?.message}
                  />

                  {serverError && (
                    <p className="text-sm text-red-500">{serverError}</p>
                  )}

                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact info sidebar */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                  Prefer a direct chat?
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  We&apos;re always happy to jump on a call. Reach out and we&apos;ll
                  schedule a time that works for you.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-border">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">Email us</p>
                    <p className="text-sm font-medium text-text-primary">
                      hello@fig.agency
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-border">
                  <div className="w-10 h-10 rounded-lg bg-accent-warm/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-accent-warm" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">Response time</p>
                    <p className="text-sm font-medium text-text-primary">
                      Within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
