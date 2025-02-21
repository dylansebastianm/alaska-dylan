import * as z from "zod";

// Define el esquema de validación para el formulario
export const formSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  surname: z.string().min(1, "El apellido es obligatorio"),
  phone: z.string().min(1, "El teléfono es obligatorio"),
  age: z.number().min(18, "Debes ser mayor de 18 años"),
  loan_amount: z.number().min(1, "El monto del préstamo debe ser mayor a 0"),
  loan_weeks: z.number().min(1, "El número de semanas debe ser al menos 1"),
  loan_date: z.string().min(1, "La fecha es obligatoria"),
  check: z.boolean().refine(val => val === true, "Debes aceptar los términos"),
});
