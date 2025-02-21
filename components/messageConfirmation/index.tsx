import { format } from "date-fns";

interface ConfirmationMessageProps {
    type: "success" | "error";
    data?: {
        loan_amount: number;
        loan_weeks: number;
        loan_date: string;
    } | null;
}

export function ConfirmationMessage({ type, data }: ConfirmationMessageProps) {
    if (type === "success" && data) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-semibold text-green-900 mb-4">¡Gracias por tu solicitud!</h2>
                <div className="space-y-2 text-green-800">
                    <p>Hemos recibido tu solicitud de préstamo con los siguientes detalles:</p>
                    <ul className="mt-4 space-y-2">
                        <li>Importe: ${data.loan_amount}</li>
                        <li>Plazo: {data.loan_weeks} años</li>
                        <li>Fecha solicitada: {format(new Date(data.loan_date), "dd/MM/yyyy")}</li>
                    </ul>
                </div>
            </div>
        );
    }

    if (type === "error") {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-semibold text-red-900 mb-4">
                    Lamentablemente no nos es posible otorgarte un préstamo por el momento
                </h2>
            </div>
        );
    }

    return null;
}
