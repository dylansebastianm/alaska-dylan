"use client";
import { FormProvider } from "react-hook-form";
import { useLoanForm } from "./hooks/useLoanForm";
import { NameField, PhoneField, AgeField, LoanAmountField, LoanDateField, LoanWeeksField, TermsField, EmailField } from "./loanFields/index";
import { Button } from "@/components/ui/button";
import { UserData } from "@/lib/types";
import { ConfirmationMessage } from "../ConfirmationMessage";

interface LoanFormProps {
    initialData: UserData | null;
}

export function LoanForm({ initialData }: LoanFormProps) {
    const { form, isSubmitting, success, error, submittedData, onSubmit } = useLoanForm(initialData);

    if (success) {
        return <ConfirmationMessage type="success" data={submittedData} />;
    }

    if (error) {
        return <ConfirmationMessage type="error" />;
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <NameField control={form.control} name="name" />
                    <NameField control={form.control} name="surname" />
                </div>
                <EmailField control={form.control} />
                <div className="grid gap-6 md:grid-cols-2">
                    <PhoneField control={form.control} />
                    <AgeField control={form.control} />
                </div>
                <LoanAmountField control={form.control} />
                <LoanDateField control={form.control} />
                <LoanWeeksField control={form.control} />
                <TermsField control={form.control} />
                {form.formState.errors.root && <div className="text-red-600 text-sm">{form.formState.errors.root.message}</div>}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                </Button>
            </form>
        </FormProvider>
    );
}
