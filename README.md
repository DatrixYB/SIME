<p align="center">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="64">
    <mask height="180" id="mask0" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style="mask-type: alpha;">
      <circle cx="90" cy="90" fill="black" r="90"></circle>
    </mask>
    <g mask="url(#mask0)">
      <circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle>
      <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear)"></path>
      <rect fill="url(#paint1_linear)" height="72" width="12" x="115" y="54"></rect>
    </g>
    <defs>
      <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="109" x2="144.5" y1="116.5" y2="160.5">
        <stop stop-color="white"></stop>
        <stop offset="1" stop-color="white" stop-opacity="0"></stop>
      </linearGradient>
      <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear" x1="121" x2="120.799" y1="54" y2="106.875">
        <stop stop-color="white"></stop>
        <stop offset="1" stop-color="white" stop-opacity="0"></stop>
      </linearGradient>
    </defs>
  </svg>
</p>

<h2 align="center">SIME - Frontend</h2>
<p align="center">Sistema Integral para Microempresas (SIME) - Interfaz web desarrollada con <a href="https://nextjs.org" target="_blank">Next.js</a></p>

---

## Descripción

El **frontend de SIME** está desarrollado con **Next.js 13**, proporcionando una **interfaz interactiva y moderna** para gestionar usuarios, productos y ventas.
Se comunica con el **backend Nest.js** mediante API RESTful y soporta autenticación JWT.

---

## Requisitos

* Node.js ≥ 18
* npm, yarn o pnpm
* Conexión al backend en `http://localhost:3000`
* Puerto por defecto del frontend: **3001**

---

## Instalación

Clonar el repositorio e instalar dependencias:

```bash
git clone <URL_REPO>
cd frontend
npm install
# o yarn install
# o pnpm install
```

---

## Ejecución

```bash
# Modo desarrollo
npm run dev
# o yarn dev
# o pnpm dev
```

Abrir [http://localhost:3001](http://localhost:3001) en tu navegador.

---

## Estructura de carpetas

```
frontend/
│
├─ app/          # Rutas y páginas principales
├─ components/   # Componentes reutilizables
├─ styles/       # Archivos CSS / Tailwind
├─ public/       # Recursos estáticos
├─ package.json
└─ next.config.js
```

---

## Configuración del entorno

Crea un archivo `.env` en la raíz del frontend:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

* `NEXT_PUBLIC_API_URL`: URL del backend para consumir los endpoints REST.

---

## Uso

* Inicia sesión con usuario y contraseña registrados en el backend.
* Navega entre módulos: **Dashboard**, **Usuarios**, **Productos**, **Ventas**.
* Los cambios se reflejan en tiempo real gracias a la comunicación con el backend.

---

## Aprender Más

Para profundizar en Next.js:

* [Next.js Documentation](https://nextjs.org/docs)
* [Learn Next.js](https://nextjs.org/learn) - tutorial interactivo
* [Next.js GitHub](https://github.com/vercel/next.js)

---

## Despliegue

* Se recomienda desplegar en plataformas como **Vercel** o **Netlify**.
* Configurar la variable `NEXT_PUBLIC_API_URL` para apuntar al backend en producción.
* Documentación de despliegue: [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)

---

## Soporte

Proyecto open source bajo **MIT License**. Para soporte o contribuciones, contacta con el autor o revisa los issues en el repositorio.

---

---

## Mantente en contacto

* Autor: [Breyner Ocampo Cardenas](mailto:datrixyb@gmail.com)

* Website: [https://sime.com](https://sime.com)

---
## Licencia

MIT License

---
