# Roda Credits Frontend

Aplicación web desarrollada en React para simular créditos de movilidad eléctrica y registrar solicitudes de financiación.

El frontend consume una API REST desarrollada en Flask y desplegada en Render.

---

# Tecnologías utilizadas

- React 19
- Vite 8
- Tailwind CSS 4
- JavaScript
- ESLint

---

# Requisitos previos

- Node.js 20 o superior
- npm

---

# Instalación local

## 1. Clonar el repositorio

```bash
git clone https://github.com/Maicolls/roda-frontend.git
```

Entrar al proyecto:

```bash
cd roda-frontend
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:5000
```

Si no defines esta variable, el frontend puede configurarse para consumir la API desplegada en producción.

---

# Ejecutar proyecto

```bash
npm run dev
```

La aplicación normalmente estará disponible en:

```txt
http://localhost:5173
```

---

# Build de producción

```bash
npm run build
```

---

# Funcionalidades implementadas

- Simulación de crédito para bicicletas y motos eléctricas
- Validaciones de formularios
- Resumen financiero del crédito
- Tabla de amortización
- Registro de solicitudes de crédito
- Manejo de loading states
- Manejo básico de errores
- Diseño responsive básico
- Integración completa con backend Flask

---

# Integración API

El frontend consume los siguientes endpoints REST:

- `POST /simulate`
- `POST /requests`

La URL base de la API se configura mediante:

```env
VITE_API_URL
```

---

# Frontend desplegado

[Frontend Roda Credits](https://roda-frontend-two.vercel.app?utm_source=chatgpt.com)

---

# Backend API

[Backend Roda Credits API](https://roda-backend-k6tk.onrender.com?utm_source=chatgpt.com)

---

# Decisiones técnicas relevantes

- Se utilizó React con Vite para acelerar el desarrollo y mejorar el rendimiento.
- Tailwind CSS permitió construir una interfaz responsive de manera rápida y consistente.
- La lógica financiera fue centralizada en el backend para mantener separación de responsabilidades.
- El consumo de la API fue abstraído en una capa independiente (`creditApi.js`) para mantener mejor organización del código.
- Se implementaron validaciones tanto en frontend como backend para mejorar seguridad y experiencia de usuario.
- El frontend puede alternar fácilmente entre backend local y backend en producción usando variables de entorno.

---

# Flujo funcional

1. El usuario completa el formulario de simulación.
2. El frontend envía los datos al endpoint `/simulate`.
3. El backend calcula:
   - cuota mensual
   - total intereses
   - total pago
   - tabla de amortización
4. El usuario revisa el resultado de la simulación.
5. El usuario completa el formulario de solicitud.
6. El frontend envía los datos al endpoint `/requests`.
7. El backend persiste la información en PostgreSQL.

---

# Notas adicionales

- El proyecto utiliza Fetch API para comunicación HTTP.
- El diseño fue construido con enfoque responsive básico.
- El despliegue del frontend se realizó usando Vercel.
- El backend puede tardar algunos segundos en responder si Render reactiva una instancia gratuita inactiva.