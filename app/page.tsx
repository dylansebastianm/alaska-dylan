import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LoanForm } from "@/components/loanForm";
import { getUserData } from "@/lib/actions";
import Navbar from "@/components/nav";

export default async function LoanPage() {
  const { data: userData, error } = await getUserData();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Préstamos", href: "/prestamos" },
          ]}
        />
        <div className="max-w-3xl mx-auto mt-8">
          <h1 className="text-3xl font-semibold mb-6" style={{ color: '#262626' }}>
            Solicitud de Préstamo
          </h1>

          <h2 className="text-1xl font-semibold mb-6" style={{ color: '#262626' }}>
            ¡Con Alaska-Préstamos podes acceder a financiamiento exclusivo para comprar tus muebles!
          </h2>
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              {error}
            </div>
          ) : (
            <LoanForm initialData={userData} />
          )}
        </div>
      </div>
    </>

  );
}
