const API_URL = import.meta.env.VITE_API_URL || "https://roda-backend-k6tk.onrender.com";

export const simulateCredit = async (formData) => {
  const response = await fetch(`${API_URL}/simulate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al simular crédito");
  }

  return data;
};

export const saveCreditRequest = async (payload) => {
  const response = await fetch(`${API_URL}/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al guardar solicitud");
  }

  return data;
};