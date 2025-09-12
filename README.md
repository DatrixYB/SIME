<p align="center">
  <a href="#" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
 Sistema Integral para Microempresas (SIME) - Backend desarrollado con <a href="http://nestjs.com" target="_blank">Nest.js</a>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/package/@nestjs/common" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
</p>

---

## Descripción

El backend del sistema **SIME** está desarrollado en **Nest.js** con TypeScript, proporcionando **endpoints RESTful seguros** para autenticación, gestión de usuarios, ventas y productos.

---

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone <URL_REPO>
cd backend
npm install
```

---

## Ejecución de la aplicación

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run start:prod

# Modo watch (recompila automáticamente)
npm run start
```

La aplicación corre por defecto en el puerto **3000**.

---

## Base de datos y Seed

Si usas **Prisma** o migraciones:

```bash
# Ejecutar seed
npx ts-node prisma/seed.ts
```

---

## Pruebas

```bash
# Pruebas unitarias
npm run test

# Pruebas end-to-end
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```

---

## Endpoints principales

| Endpoint    | Método | Descripción                         |
| ----------- | ------ | ----------------------------------- |
| `/login`    | POST   | Autenticación de usuarios           |
| `/users`    | GET    | Listado de usuarios (protegido JWT) |
| `/sales`    | POST   | Registrar una nueva venta           |
| `/products` | GET    | Consultar productos disponibles     |

---

## Soporte

Proyecto open source bajo **MIT License**.
Puedes contribuir o apoyar el proyecto siguiendo las guías de Nest.js: [Nest Support](https://docs.nestjs.com/support).

---

## Mantente en contacto

* Autor: [Breyner Ocampo Cardenas](mailto:datrixyb@gmail.com)
* Website: [https://sime.com](https://sime.com)

---

## Licencia

Este proyecto está licenciado bajo **MIT License**.
