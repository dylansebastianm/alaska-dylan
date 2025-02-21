import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Checkbox } from "@/components/ui/checkbox"
import { useFormContext } from "react-hook-form"


export function NameField({ control, name }: any) {
  return (
    <FormField control={control} name={name} render={({ field }: any) => (
      <FormItem>
        <FormLabel>{name === "name" ? "Nombre" : "Apellidos"}</FormLabel>
        <FormControl>
          <Input {...field} disabled />
        </FormControl>
      </FormItem>
    )} />
  )
}

export function EmailField({ control }: any) {
  return (
    <FormField control={control} name="email" render={({ field }: any) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input {...field} disabled />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  )
}

export function PhoneField({ control }: any) {
  return (
    <FormField control={control} name="phone" render={({ field }: any) => (
      <FormItem>
        <FormLabel>Teléfono</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  )
}

export function AgeField({ control }: any) {
  const { setError } = useFormContext();
  return (
    <FormField control={control} name="age" render={({ field }: any) => (
      <FormItem>
        <FormLabel>Edad</FormLabel>
        <FormControl>
          <Input
            type="number"
            {...field}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value);
              field.onChange(value);
              if (isNaN(value)) {
                setError("age", {
                  type: "manual",
                  message: "Por favor, ingresa un número válido para la edad",
                });
              }
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  );
}

export function LoanAmountField({ control }: any) {
  const { setError } = useFormContext();

  return (
    <FormField control={control} name="loan_amount" render={({ field }: any) => (
      <FormItem>
        <FormLabel>Importe del Préstamo ($)</FormLabel>
        <FormControl>
          <Input
            type="number"
            {...field}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value);
              field.onChange(value);
              if (isNaN(value)) {
                setError("loan_amount", {
                  type: "manual",
                  message: "Por favor, ingresa un número válido para el importe del préstamo",
                });
              }
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  );
}

export function LoanDateField({ control }: any) {
  const { setError, clearErrors } = useFormContext();

  return (
    <FormField control={control} name="loan_date" render={({ field }: any) => (
      <FormItem className="flex flex-col">
        <FormLabel>Fecha del Préstamo</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant="outline" className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}>
                {field.value ? format(new Date(field.value + "T00:00:00"), "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value ? new Date(field.value + "T00:00:00") : undefined}
              onSelect={(date) => {
                if (!date) {
                  setError("loan_date", {
                    type: "manual",
                    message: "La fecha del préstamo es obligatoria",
                  });
                  return;
                }

                const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

                const formattedDate = format(localDate, "yyyy-MM-dd");

                clearErrors("loan_date");
                field.onChange(formattedDate);
              }}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )} />
  );
}


export function LoanWeeksField({ control }: any) {
  return (
    <FormField control={control} name="loan_weeks" render={({ field }: any) => (
      <FormItem>
        <FormLabel>Tiempo a devolver (años)</FormLabel>
        <Select onValueChange={(value) => field.onChange(Number.parseInt(value))} defaultValue={field.value.toString()}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el plazo" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year} {year === 1 ? "año" : "años"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )} />
  )
}

export function TermsField({ control }: any) {
  return (
    <FormField
      control={control}
      name="check"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              Acepto los{" "}
              <a
                href="https://cloudframework.io/terminos-y-condiciones/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                términos y condiciones
              </a>
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />

  )
}
