"use client"
import { useState, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { useLoanForm } from "./hooks/useLoanForm";
import { NameField, PhoneField, AgeField, LoanAmountField, LoanDateField, LoanWeeksField, TermsField, EmailField } from "./loanFields/index";
import { Button } from "@/components/ui/button";
import { UserData } from "@/lib/types";
import { ConfirmationMessage } from "../confirmationMessage";

interface LoanFormProps {
    initialData: UserData | null;
}

export function LoanForm({ initialData }: LoanFormProps) {
    const { form, isSubmitting, success, error, submittedData, onSubmit } = useLoanForm(initialData);
    const [showForm, setShowForm] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        if (success || error) {
            setShowForm(false);
            setShowConfirmation(true);
        }
    }, [success, error]);

    const handleRequestAnotherLoan = () => {
        setShowForm(true);
        setShowConfirmation(false);
        form.reset();
    };

    return (
        <>
            {showForm && (
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
            )}

            {showConfirmation && (
                <>
                    <ConfirmationMessage type={success ? "success" : "error"} data={submittedData} />
                    <Button type="button" className="w-full mt-4" onClick={handleRequestAnotherLoan}>
                        Solicitar otro préstamo
                    </Button>
                </>
            )}
        </>
    );
}
