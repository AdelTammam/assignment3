import { z } from "zod";

export const employeeSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(60, "Full name must be under 60 characters."),

  employeeId: z
    .string()
    .trim()
    .min(4, "Employee ID must be at least 4 characters.")
    .max(10, "Employee ID must be under 10 characters.")
    .regex(/^[A-Za-z0-9]+$/, "Employee ID must be alphanumeric only."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email."),

  phone: z
    .string()
    .trim()
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Must have at least 10 digits."
    ),

  department: z
    .string()
    .trim()
    .min(2, "Department must be at least 2 characters.")
    .max(50, "Department must be under 50 characters."),

  postalCode: z
    .string()
    .trim()
    .regex(
      /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/,
      "Enter a valid Canadian postal code (e.g. T2X 1A1)."
    ),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
