import { simulateCredit } from "../api/creditApi";

function SimulationForm({
  formData,
  setFormData,
  errors,
  setErrors,
  setSimulationResult,
  loading,
  setLoading,
}) {
  const validateForm = () => {
    const newErrors = {};

    if (!formData.vehicleType) {
      newErrors.vehicleType = "Selecciona un tipo de vehiculo";
    }

    if (!formData.vehicleValue) {
      newErrors.vehicleValue = "El valor del vehiculo es obligatorio";
    } else if (Number(formData.vehicleValue) <= 0) {
      newErrors.vehicleValue = "El valor debe ser mayor a 0";
    } else if (Number(formData.vehicleValue) < 500000) {
      newErrors.vehicleValue = "El vehículo debe costar mínimo $500.000";
    }

    if (!formData.initialFee) {
      newErrors.initialFee = "La cuota inicial es obligatoria";
    } else if (Number(formData.initialFee) < 0) {
      newErrors.initialFee = "La cuota inicial no puede ser negativa";
    } else if (Number(formData.initialFee) > Number(formData.vehicleValue)) {
      newErrors.initialFee = "La cuota no puede ser mayor al vehículo";
    }

    if (!formData.months) {
      newErrors.months = "El plazo es obligatorio";
    } else if (Number(formData.months) <= 0) {
      newErrors.months = "El plazo debe ser mayor a 0";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    try {
      setLoading(true);

      const result = await simulateCredit(formData);

      setSimulationResult(result);

      setErrors({});
    } catch (error) {
      setErrors({
        api: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden">
      {/* Encabezado */}
      <div className="px-8 pt-8 pb-6 border-b border-slate-100">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          Simula tu crédito
        </h2>
        <p className="text-slate-500 mt-2 text-sm md:text-base">
          Completa los datos para calcular tu cuota mensual y el plan de pagos.
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tipo de vehículo */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Tipo de vehículo
            </label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
            >
              <option value="">Selecciona una opción</option>
              <option value="bike">Bicicleta eléctrica</option>
              <option value="motorcycle">Moto eléctrica</option>
            </select>
            {errors.vehicleType && (
              <p className="text-sm text-red-500">{errors.vehicleType}</p>
            )}
          </div>

          {/* Valor del vehículo */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Valor del vehículo
            </label>
            <input
              type="number"
              name="vehicleValue"
              value={formData.vehicleValue}
              onChange={handleChange}
              placeholder="Ej: 8.000.000"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
            />
            {errors.vehicleValue && (
              <p className="text-sm text-red-500">{errors.vehicleValue}</p>
            )}
          </div>

          {/* Cuota inicial */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Cuota inicial
            </label>
            <input
              type="number"
              name="initialFee"
              value={formData.initialFee}
              onChange={handleChange}
              placeholder="Ej: 1.000.000"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
            />
            {errors.initialFee && (
              <p className="text-sm text-red-500">{errors.initialFee}</p>
            )}
          </div>

          {/* Plazo en meses */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Plazo en meses
            </label>
            <input
              type="number"
              name="months"
              value={formData.months}
              onChange={handleChange}
              placeholder="Ej: 24"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
            />
            {errors.months && (
              <p className="text-sm text-red-500">{errors.months}</p>
            )}
          </div>
        </div>

        {/* Error API */}
        {errors.api && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600 text-center">{errors.api}</p>
          </div>
        )}

        {/* Botón */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center justify-center rounded-xl px-10 py-4 font-bold shadow-lg transition-all duration-300 ${
              loading
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-lime-400 text-slate-900 hover:bg-lime-500 hover:shadow-xl hover:-translate-y-0.5"
            }`}
          >
            {loading ? "Calculando..." : "Calcular crédito"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SimulationForm;
