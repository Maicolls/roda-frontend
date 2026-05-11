import { useState } from "react"
import { saveCreditRequest } from "../api/creditApi"; 

function ApplicantForm({ simulationResult, formData }) {
  const [applicantData, setApplicantData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setApplicantData({
      ...applicantData,
      [e.target.name]: e.target.value,
    })
    setErrors({
      ...errors,
      [e.target.name]: "",
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!applicantData.firstName) newErrors.firstName = "El nombre es obligatorio"
    if (!applicantData.lastName) newErrors.lastName = "El apellido es obligatorio"

    if (!applicantData.email) {
      newErrors.email = "El correo es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicantData.email)) {
      newErrors.email = "Ingresa un correo válido"
    }

    if (!applicantData.phone) {
      newErrors.phone = "El teléfono es obligatorio"
    } else if (!/^\d+$/.test(applicantData.phone)) {
      newErrors.phone = "El teléfono solo debe contener números"
    }

    if (!applicantData.city) newErrors.city = "La ciudad es obligatoria"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const isValid = validateForm()
    if (!isValid) return

    setLoading(true)

    try {
      // Combinamos datos personales + datos de la simulación
      const payload = {
        ...applicantData,
        vehicleType: formData.vehicleType,
        vehicleValue: formData.vehicleValue,
        initialFee: formData.initialFee,
        months: formData.months,
        financedAmount: simulationResult.financedAmount,
        monthlyPayment: simulationResult.monthlyPayment,
        totalInterest: simulationResult.totalInterest,
        totalPayment: simulationResult.totalPayment,
      }

      await saveCreditRequest(payload)
      setSuccess(true)

    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

    // Pantalla de éxito
  if (success) {
    return (
      <div className="bg-white rounded-3xl overflow-hidden">
        <div className="px-8 py-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-lime-100 flex items-center justify-center text-4xl">
            ✅
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            ¡Solicitud registrada!
          </h2>

          <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
            Hemos recibido tu solicitud de crédito. Nuestro equipo se pondrá en
            contacto contigo muy pronto para continuar con el proceso.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden">
      {/* Encabezado */}
      <div className="px-8 pt-8 pb-6 border-b border-slate-100">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          Solicitud de crédito
        </h2>
        <p className="text-slate-500 mt-2">
          Completa tus datos personales para registrar tu solicitud.
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Nombre
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Ingresa tu nombre"
              value={applicantData.firstName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          {/* Apellido */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Apellido
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Ingresa tu apellido"
              value={applicantData.lastName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>

          {/* Correo */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={applicantData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Teléfono
            </label>
            <input
              type="text"
              name="phone"
              placeholder="3001234567"
              value={applicantData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Ciudad */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Ciudad
            </label>
            <input
              type="text"
              name="city"
              placeholder="Bogotá"
              value={applicantData.city}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
            />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city}</p>
            )}
          </div>
        </div>

        {/* Botón */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center justify-center rounded-xl px-10 py-4 font-bold shadow-lg transition-all duration-300 ${
              loading
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5"
            }`}
          >
            {loading ? "Registrando..." : "Registrar solicitud"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplicantForm