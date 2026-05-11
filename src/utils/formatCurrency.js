export const formatNumber = (value) => {
  if (!value) return "";

  return Number(value).toLocaleString("es-CO");
};

export const cleanNumber = (value) => {
  return value.replace(/\D/g, "");
};