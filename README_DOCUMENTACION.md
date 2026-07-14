# Documentación del proyecto: Instituto Tecnológico Sitio Uno

## 1. Resumen general

Este proyecto está orientado a convertir la presencia digital del Instituto Tecnológico Sitio Uno en una aplicación moderna, modular y fácil de mantener. La idea central es pasar de un front-end estático a una arquitectura basada en componentes, con una estructura preparada para crecer hacia módulos como autenticación, dashboard estudiantil, administración y gestión académica.

## 2. Estructura actual del proyecto

La organización del repositorio se divide en dos grandes partes:

- un frontend desarrollado con React y Vite,
- una carpeta de documentación y planificación del sistema.

### Estructura principal

```text
instituto_sitio_uno/
├── README.md
├── README_DOCUMENTACION.md
├── README_PLANIFICACION.md
├── README_MODULOS.md
├── README_METODOLOGIA.md
└── front-end2.0/
    ├── package.json
    ├── vite.config.js
    ├── public/
    └── src/
        ├── App.jsx
        ├── components/
        ├── contexts/
        ├── features/
        │   ├── auth/
        │   └── dashboard/
        ├── hooks/
        ├── layouts/
        ├── pages/
        ├── router/
        └── services/
```

## 3. Cómo está organizado el frontend

### 3.1 Componentes reutilizables

La carpeta src/components contiene bloques visuales de la interfaz, como el encabezado institucional, la hero section, el footer y los bloques de valor del sitio.

### 3.2 Módulos por funcionalidad

La organización por features permite separar la lógica de cada parte de la app:

- auth: login, registro y flujo de acceso.
- dashboard: vista principal para usuarios autenticados.

### 3.3 Contexto de autenticación

El proyecto utiliza un AuthContext para manejar:

- estado del usuario,
- token almacenado localmente,
- acceso protegido a rutas,
- cierre de sesión.

### 3.4 Rutas y protección de acceso

La carpeta src/router contiene la definición de rutas y el componente ProtectedRoute, que limita el acceso a la zona privada de la aplicación.

### 3.5 Servicios centralizados

La carpeta src/services y las subcarpetas de cada feature contienen la lógica de comunicación con la API, mediante un cliente HTTP que prepara las peticiones y agrega el token de autenticación cuando corresponde.

## 4. Cambios realizados hasta ahora

### 4.1 Migración del front-end a una estructura moderna

Se pasó de una estructura más estática o fragmentada hacia una aplicación React + Vite con una base modular y escalable.

### 4.2 Separación por componentes y features

Se reorganizó la interfaz para que cada parte del sistema tenga una responsabilidad clara y reutilizable.

### 4.3 Implementación de rutas principales

Se configuraron páginas para:

- landing page institucional,
- autenticación (login y registro),
- dashboard protegido.

### 4.4 Integración de autenticación básica

Se incorporó una arquitectura inicial para iniciar sesión, guardar el usuario y el token, y controlar el acceso a zonas privadas.

### 4.5 Preparación para consumo de API

Se creó un cliente HTTP centralizado para conectar la interfaz con endpoints del backend, lo que facilita la integración real con servicios futuros.

### 4.6 Configuración del entorno de desarrollo

Se estableció Vite como herramienta de ejecución y se dejó lista la estructura para pruebas con Vitest.

## 5. Estado actual del proyecto

### Completado

- estructura base del frontend React + Vite,
- landing page institucional,
- sistema de rutas,
- flujo visual de autenticación,
- dashboard base con carga de datos,
- contexto de autenticación,
- cliente HTTP con manejo de token,
- configuración de dependencias y ejecución del proyecto.

### Pendiente o en progreso

- conectar completamente con un backend real y estable,
- implementar los módulos académicos y administrativos completos,
- definir mejor el modelo de datos del instituto,
- agregar pruebas más completas,
- preparar despliegue y entorno productivo.

## 6. Cómo ejecutar el proyecto

Desde la carpeta del frontend:

```bash
cd front-end2.0
npm install
npm run dev
```

El proyecto queda disponible en el puerto 5173, o en un puerto alternativo si ese ya está ocupado.

## 7. Próximos pasos recomendados

1. Completar la integración con la API real.
2. Definir los módulos de estudiantes, docentes y administración.
3. Añadir más pantallas y componentes al dashboard.
4. Implementar pruebas automatizadas de flujo principal.
5. Documentar los contratos de datos del backend.

## 8. Conclusión

El proyecto ya tiene una base sólida para seguir creciendo. La estructura actual permite trabajar de forma más ordenada, separar responsabilidades y avanzar hacia una plataforma institucional más completa y profesional.
