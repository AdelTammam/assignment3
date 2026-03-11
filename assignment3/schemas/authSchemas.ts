import { z } from "zod";

// ── Sign-In ──────────────────────────────────────────────
export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});

export type SignInFormData = z.infer<typeof signInSchema>;

// ── Sign-Up ──────────────────────────────────────────────
export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters.")
      .max(60, "Full name must be under 60 characters."),

    email: z
      .string()
      .trim()
      .email("Enter a valid email."),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character."
      ),

    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
