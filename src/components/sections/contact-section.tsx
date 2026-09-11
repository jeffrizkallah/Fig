"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Mail, Clock, Globe } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactSchema,
  CONTACT_NEEDS,
  type ContactFormData,
} from "@/lib/schemas";
import { submitContact } from "@/actions/contact";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const DETAILS = [
  { icon: Mail, label: "Email", value: "hello@fig.agency", href: "mailto:hello@fig.agency" },
  { icon: Clock, label: "Response", value: "Within 24 hours" },
  { icon: Globe, label: "Languages", value: "Português · English" },
];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { needs: [] },
  });

  const needs = watch("needs") ?? [];

  const toggleNeed = (need: (typeof CONTACT_NEEDS)[number]) => {
    const next = needs.includes(need)
      ? needs.filter((n) => n !== need)
      : [...needs, need];
    setValue("needs", next, { shouldValidate: true, shouldDirty: true });
  };

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
    <section
      id="contact"
      className="pt-8 md:pt-10 pb-32 md:pb-40 bg-bg-secondary"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: the ask, and how to reach us */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-accent-hover">
                Get in touch
              </span>
              <h2 className="font-heading text-4xl md:text-5xl leading-[1.05] text-text-primary">
                Tell us what&apos;s
                <br />
                slowing you down.
              </h2>
              <p className="text-lg leading-relaxed text-text-secondary max-w-md">
                A 30-minute call, no commitment. We&apos;ll tell you honestly
                whether we can help and what it would take.
              </p>
            </div>

            <ul className="flex flex-col gap-4">
              {DETAILS.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="flex-shrink-0 w-[30px] h-[30px] rounded-full border border-border bg-white flex items-center justify-center text-text-primary">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs text-text-secondary">{label}</span>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-text-primary hover:text-accent transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-text-primary">
                        {value}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: the form card */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-border p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-3xl text-text-primary mb-3">
                  Message sent.
                </h3>
                <p className="text-text-secondary">
                  Thanks for reaching out. We&apos;ll reply within 24 hours to
                  set up a time to talk.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="bg-white rounded-2xl border border-border p-6 sm:p-8 flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Name"
                    id="name"
                    placeholder="Maria Silva"
                    autoComplete="name"
                    {...register("name")}
                    error={errors.name?.message}
                  />
                  <Input
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="you@company.pt"
                    autoComplete="email"
                    {...register("email")}
                    error={errors.email?.message}
                  />
                </div>

                <Input
                  label="Company"
                  id="company"
                  placeholder="Your company name"
                  autoComplete="organization"
                  {...register("company")}
                  error={errors.company?.message}
                />

                <div className="flex flex-col gap-2">
                  <span className="block text-sm font-medium text-text-primary">
                    What do you need?
                  </span>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="What do you need?">
                    {CONTACT_NEEDS.map((need) => {
                      const on = needs.includes(need);
                      return (
                        <button
                          key={need}
                          type="button"
                          onClick={() => toggleNeed(need)}
                          aria-pressed={on}
                          className={cn(
                            "inline-flex items-center h-9 px-4 rounded-full border text-[13px] font-medium transition-colors duration-200",
                            on
                              ? "bg-text-primary border-text-primary text-white"
                              : "bg-white border-border text-text-primary hover:bg-bg-secondary"
                          )}
                        >
                          {need}
                        </button>
                      );
                    })}
                  </div>
                  {errors.needs && (
                    <p className="text-sm text-red-500">{errors.needs.message}</p>
                  )}
                </div>

                <Textarea
                  label="Message (optional)"
                  id="message"
                  rows={3}
                  placeholder="What's taking too much of your time right now?"
                  {...register("message")}
                  error={errors.message?.message}
                />

                {serverError && (
                  <p className="text-sm text-red-500">{serverError}</p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Button type="submit" size="lg" disabled={isSubmitting} className="h-[52px] px-7 py-0">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="ml-2.5 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <span className="text-sm text-text-secondary">
                    We reply within 24 hours.
                  </span>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
