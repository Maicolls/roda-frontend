function AmortizationTable({ schedule }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="p-6 md:p-8">
      {/* Encabezado */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          Plan de pagos
        </h2>
        <p className="text-slate-500 mt-2">
          Detalle mes a mes de la amortización del crédito.
        </p>
      </div>

      {/* Tabla responsive */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-[900px] w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Cuota
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold">
                Valor cuota
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold">
                Interés
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold">
                Abono capital
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold">
                Saldo restante
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {schedule.map((item, index) => (
              <tr
                key={item.month}
                className={`transition-colors hover:bg-slate-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                }`}
              >
                <td className="px-6 py-4 font-semibold text-slate-700">
                  {item.month}
                </td>

                <td className="px-6 py-4 text-right font-mono text-slate-800">
                  {formatCurrency(item.payment)}
                </td>

                <td className="px-6 py-4 text-right font-mono text-amber-600">
                  {formatCurrency(item.interest)}
                </td>

                <td className="px-6 py-4 text-right font-mono text-lime-700 font-semibold">
                  {formatCurrency(item.capital)}
                </td>

                <td className="px-6 py-4 text-right font-mono text-slate-600">
                  {formatCurrency(item.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AmortizationTable;