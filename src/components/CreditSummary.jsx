function CreditSummary({ simulationResult }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const summaryCards = [
    {
      label: "Valor financiado",
      value: simulationResult.financedAmount,
      accent: "bg-blue-50 border-blue-100",
      valueColor: "text-blue-700",
    },
    {
      label: "Cuota mensual",
      value: simulationResult.monthlyPayment,
      accent: "bg-lime-50 border-lime-100",
      valueColor: "text-lime-700",
    },
    {
      label: "Total intereses",
      value: simulationResult.totalInterest,
      accent: "bg-amber-50 border-amber-100",
      valueColor: "text-amber-700",
    },
    {
      label: "Total a pagar",
      value: simulationResult.totalPayment,
      accent: "bg-violet-50 border-violet-100",
      valueColor: "text-violet-700",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          Resumen del crédito
        </h2>
        <p className="text-slate-500 mt-2">
          Visualiza los valores más importantes de tu financiación.
        </p>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all duration-300 ${card.accent}`}
          >
            <p className="text-sm font-medium text-slate-500 mb-3">
              {card.label}
            </p>

            <p className={`text-2xl font-bold tracking-tight ${card.valueColor}`}>
              {formatCurrency(card.value)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CreditSummary;