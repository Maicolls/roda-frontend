const API_URL = 'http://127.0.0.1:5000';

export const simulateCredit = async (formData) => {
    const response = await fetch(`${API_URL}/simulate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Error al simular crédito');
    }
    return data;
};

export const saveRequest = async (payload) => {
    const response = await fetch(`${API_URL}/requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Error al registrar solicitud');
    }
    return data;
};