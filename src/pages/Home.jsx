import Navbar from "../components/Navbar";
import SimulationForm from "../components/SimulationForm";
import CreditSummary from "../components/CreditSummary";
import AmortizationTable from "../components/AmortizationTable";
import ApplicantForm from "../components/ApplicantForm";
import { useState } from "react";

function Home() {

  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleValue: "",
    initialFee: "",
    months: "",
  });

  const [errors, setErrors] = useState({});
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setFormData({
      vehicleType: "",
      vehicleValue: "",
      initialFee: "",
      months: "",
    });

    setSimulationResult(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="bg-[#1a1f2e] text-white pt-16 pb-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Financia tu vehículo{" "}
            <span className="text-[#c8f000]">eléctrico</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl font-light">
            Simula tu crédito en segundos, sin letra pequeña ni sorpresas.
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">

        <section className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <SimulationForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            setSimulationResult={setSimulationResult}
            loading={loading}
            setLoading={setLoading}
          />
        </section>

        {simulationResult && (
          <div className="space-y-12 mt-12 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">

            <CreditSummary
              simulationResult={simulationResult}
              formData={formData}
            />

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
              <AmortizationTable schedule={simulationResult.schedule} />
            </div>

            <div className="bg-[#f8fafc] p-1 rounded-3xl border border-dashed border-slate-300">
              <ApplicantForm
                simulationResult={simulationResult}
                formData={formData}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-slate-800"
              >
                Nueva simulación
              </button>
            </div>

          </div>
        )}

      </main>

      <footer className="bg-white border-t border-slate-200 text-slate-500 text-center py-8 text-sm">
        <p>© 2026 Roda Credits · Movilidad Eléctrica</p>

        <p className="mt-1 font-medium text-slate-400 italic text-xs uppercase tracking-widest">
          Financiamiento Inclusivo
        </p>
      </footer>
    </div>
  );
}

export default Home;