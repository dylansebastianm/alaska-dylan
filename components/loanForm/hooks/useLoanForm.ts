import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/forms/formSchema";
import { submitLoanForm } from "@/lib/utils/fetchLoan";
import { UserData } from "@/lib/types";
import { z } from "zod";

export function useLoanForm(initialData: UserData | null) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submittedData, setSubmittedData] = useState<{
        loan_amount: number;
        loan_weeks: number;
        loan_date: string;
    } | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...initialData,
            loan_amount: initialData?.loan_amount ?? 0,
            loan_weeks: initialData?.loan_weeks ?? 1,
            check: initialData?.check ?? false,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!values.phone || !values.age || !values.loan_amount || !values.loan_date || !values.loan_weeks || !values.check) {
            form.setError("root", { message: "Todos los campos obligatorios deben estar completos." });
            return;
        }

        if (values.loan_amount < 10 || values.loan_amount > 1000) {
            form.setError("loan_amount", { message: "El importe del préstamo debe estar entre 10 y 1000." });
            return;
        }

        if (new Date(values.loan_date) <= new Date()) {
            form.setError("loan_date", { message: "La fecha debe ser una fecha futura." });
            return;
        }

        if (!initialData || !initialData.id) {
            form.setError("root", { message: "No se encontró el ID del usuario." });
            return;
        }

        const userId = Number(initialData.id);
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await submitLoanForm(values, userId);

            if (response.error) {
                form.setError("root", { message: response.error });
                setError(response.error);
                return;
            }

            if (response.success) {
                setSuccess(true);
                setSubmittedData({
                    loan_amount: values.loan_amount,
                    loan_weeks: values.loan_weeks,
                    loan_date: values.loan_date,
                });
            }
        } catch (error) {
            form.setError("root", { message: "Ha ocurrido un error. Por favor, inténtelo de nuevo." });
            setError("Ha ocurrido un error. Por favor, inténtelo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return { form, isSubmitting, success, error, submittedData, onSubmit };
}
