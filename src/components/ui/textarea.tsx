import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-primary"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-3 text-text-primary placeholder:text-text-secondary/50 transition-colors duration-200 resize-none",
            "focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
            error ? "border-red-400" : "border-border",
            className
          )}
          rows={5}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
