# MVP Scope — ITSU (Instituto Tecnologico Sitio Uno)

> **Version:** 1.0  
> **Fecha:** Julio 2026  
> **Estado:** Fase 1 completada, Fase 2 en planificacion

---

## 1. Resumen del Producto

ITSU es una aplicacion web SPA construida con React + Vite que digitaliza los procesos administrativos y academicos de un instituto tecnologico. El MVP se enfoca en tres pilares: **autenticacion segura**, **dashboard del estudiante** y **biblioteca digital de materias**. El sistema opera bajo un modelo RBAC (Role-Based Access Control) con tres roles: estudiante, docente y administrativo.

El objetivo del MVP es validar que los estudiantes pueden registrarse, autenticarse, acceder a su informacion academica y consultar materiales de estudio de sus materias asignadas — todo desde una unica plataforma web responsive.

---

## 2. Usuario Objetivo

### Rol primario: Estudiante

| Atributo | Descripcion |
|:---|:---|
| **Perfil** | Aspirante o estudiante activo del instituto tecnologico |
| **Necesidad principal** | Acceder a su informacion academica y materiales de estudio |
| **Dispositivo** | Desktop o movil (navegador web) |
| **Conocimiento tecnico** | Basico — sabe usar correo electronico y navegadores |

### Roles secundarios

- **Docente**: Carga calificaciones, sube materiales a la biblioteca digital
- **Administrativo**: Gestiona periodos, asignaturas, secciones y usuarios

---

## 3. Flujos de Usuario Principales

### Flujo 1: Registro de nuevo estudiante

```
1. El aspirante visita la landing page (/)
2. Hace clic en "Registrarse"
3. Completa el formulario de registro:
   - Email (requerido)
   - Password (requerido, minimo 8 caracteres)
   - Cedula (requerido)
   - Nombres y apellidos (requeridos)
   - Telefono (opcional)
4. El sistema valida los datos y crea la cuenta en Supabase
5. Redirige al dashboard del estudiante
6. El estudiante ve su perfil y puede acceder al sistema
```

**Criterio de aceptacion:**
- [ ] El formulario valida campos obligatorios antes de enviar
- [ ] El email debe ser unico en la base de datos
- [ ] El password se almacena hasheado (Supabase Auth maneja esto)
- [ ] Despues del registro exitoso, el usuario queda autenticado automaticamente
- [ ] Si el email ya existe, muestra mensaje de error claro

### Flujo 2: Login

```
1. El usuario hace clic en "Iniciar Sesion"
2. Ingresa email y password
3. El sistema verifica las credenciales contra Supabase
4. Si son correctas: genera JWT, guarda en localStorage, redirige al dashboard
5. Si son incorrectas: muestra mensaje de error "Credenciales invalidas"
```

**Criterio de aceptacion:**
- [ ] El JWT se genera correctamente con claims de rol
- [ ] El token se almacena en localStorage
- [ ] El token se adjunta automaticamente a cada peticion HTTP
- [ ] Si el token expira, el usuario es redirigido al login
- [ ] El mensaje de error no revela si el email o el password es incorrecto

### Flujo 3: Dashboard del estudiante

```
1. El estudiante autenticado accede a /dashboard
2. El sistema carga los datos del estudiante desde Supabase
3. Se muestra:
   - Sidebar: nombre, email, rol, boton logout
   - Contenido: perfil del estudiante, estado de matricula, materias inscritas
4. El estudiante puede navegar entre secciones
```

**Criterio de aceptacion:**
- [ ] Solo usuarios autenticados pueden acceder (ProtectedRoute)
- [ ] Los datos del estudiante se cargan desde la tabla `estudiantes` en Supabase
- [ ] El sidebar muestra informacion del usuario logueado
- [ ] El boton de logout limpia el token y redirige al login
- [ ] La pagina carga en menos de 2 segundos

### Flujo 4: Biblioteca digital

```
1. El estudiante accede a "Mis Materias" en el dashboard
2. Se lista las materias inscritas en el periodo actual
3. El estudiante selecciona una materia
4. Se muestran los materiales disponibles (PDFs, documentos, enlaces, videos)
5. El estudiante puede:
   - Buscar material por nombre o tipo
   - Filtrar por unidad tematica
   - Ver vista previa de documentos
   - Descargar archivos
```

**Criterio de aceptacion:**
- [ ] Solo se muestran materias donde el estudiante esta inscrito
- [ ] Los materiales se organizan por materia > unidad tematica > tipo
- [ ] La busqueda filtra en tiempo real
- [ ] Los archivos se almacenan en Supabase Storage
- [ ] Solo los docentes asignados pueden subir materiales
- [ ] Los estudiantes pueden descargar sin restricciones adicionales

### Flujo 5: Docente sube material

```
1. El docente se autentica y accede a su dashboard
2. Selecciona la materia que imparte
3. Hace clic en "Subir material"
4. Completa:
   - Titulo del material
   - Unidad tematica
   - Tipo (PDF, documento, enlace, video)
   - Archivo o URL
5. El sistema guarda el archivo en Supabase Storage
6. El material aparece en la biblioteca digital de los estudiantes inscritos
```

**Criterio de aceptacion:**
- [ ] Solo el docente asignado a la materia puede subir material
- [ ] Los archivos se guardan en Supabase Storage con ruta organizada
- [ ] El material es visible inmediatamente para los estudiantes
- [ ] Se valida tipo de archivo y tamanho maximo (ej: 50MB)

---

## 4. Funcionalidades MVP (Must-Have)

### 4.1 Autenticacion

| Funcionalidad | Descripcion | Estado |
|:---|:---|:---|
| Registro | Formulario multi-seccion con validacion | Completada |
| Login | Credenciales contra Supabase Auth | Completada |
| JWT | Generacion, almacenamiento y adjuncion automatica | Completada |
| Logout | Limpieza de token y redireccion | Completada |
| ProtectedRoute | Guard de autenticacion por ruta | Completada |

### 4.2 Landing Page

| Funcionalidad | Descripcion | Estado |
|:---|:---|:---|
| Header | Logo, navegacion, botones auth | Completada |
| Hero | Mensaje principal + CTA | Completada |
| Sobre el instituto | Seccion informativa | Completada |
| Valores | Grid de tarjetas (Excelencia, Integridad, Innovacion) | Completada |
| Footer | Informacion de contacto, links | Completada |
| Responsive | Diseno mobile-first | Completada |

### 4.3 Dashboard Estudiante

| Funcionalidad | Descripcion | Estado |
|:---|:---|:---|
| Layout dos columnas | Sidebar + contenido principal | Completada |
| Perfil del estudiante | Datos personales y academicos | Completada |
| Estado de matricula | Activo / Suspendido / Egresado | Completada |
| Materias inscritas | Lista de materias del periodo actual | Completada |
| Logout | Cierre de sesion seguro | Completada |

### 4.4 Biblioteca Digital (Fase 2)

| Funcionalidad | Descripcion | Prioridad |
|:---|:---|:---|
| Listado de materias | Muestra materias inscritas del estudiante | Must-Have |
| Repositorio por materia | Materiales organizados por unidad tematica | Must-Have |
| Upload de archivos | Docentes suben PDFs, documentos, videos | Must-Have |
| Busqueda | Filtrado por nombre, tipo o unidad | Must-Have |
| Vista previa | Preview de documentos sin descargar | Should-Have |
| Descarga | Descarga controlada de archivos | Must-Have |
| Control de visibilidad | Publico, solo inscritos, oculto | Should-Have |
| Registro de actividad | Log de descargas por estudiante | Could-Have |

### 4.5 RBAC (Role-Based Access Control)

| Rol | Permisos |
|:---|:---|
| **Estudiante** | Ver perfil, ver materias, acceder a biblioteca, descargar materiales |
| **Docente** | Todo lo del estudiante + subir materiales, cargar calificaciones |
| **Administrativo** | Todo + gestionar usuarios, periodos, asignaturas, reportes |

---

## 5. Fuera de Alcance (Exclusiones Explicitas)

Las siguientes funcionalidades **NO** se construiran en esta version del MVP:

| Funcionalidad | Razon de exclusion |
|:---|:---|
| App movil nativa (iOS/Android) | Requiere stack separado, priorizar web primero |
| Chat en tiempo real | Complejidad adicional, no esencial para el MVP |
| Notificaciones push | Requiere infraestructura adicional (email, SMS, push) |
| Integracion con LMS externo | Dependencia de sistemas de terceros |
| Pasarela de pagos | Requiere integracion con gateway de pagos, Fase 3 |
| Materiales multimedia en streaming | Solo archivos descargables por ahora |
| Sistema de evaluacion docente | Funcionalidad complementaria, no critica |
| Multi-idioma (i18n) | Solo espanol en esta version |
| Modo offline | Requiere service workers y cache avanzado |
| Reportes exportables (PDF/Excel) | Fase 3 |

---

## 6. Stack Tecnologico

| Capa | Tecnologia | Justificacion |
|:---|:---|:---|
| **Frontend** | React 19 + Vite 8 + React Router 7 | SPA moderna, lazy loading, dev experience rapida |
| **Backend** | Node.js (logica de negocio) | Runtime JavaScript, consistencia con frontend |
| **Base de datos** | Supabase (PostgreSQL) | Auth integrado, Storage para archivos, Realtime |
| **Autenticacion** | Supabase Auth + JWT | Manejo de sesiones, roles, expiracion |
| **Almacenamiento** | Supabase Storage | Archivos de biblioteca digital (PDFs, docs, videos) |
| **Control de versiones** | Git + GitHub | Trabajo en equipo, historial de cambios |

---

## 7. Timeline y Milestones

### Oleada 1 — Cimientos ✅ COMPLETADA

| Dia | Entregable | Estado |
|:---|:---|:---|
| 1 | Setup proyecto React+Vite, estructura de carpetas | Completada |
| 2 | Sistema de autenticacion (login + registro + JWT) | Completada |
| 3 | Dashboard del estudiante con layout y datos basicos | Completada |

### Oleada 2 — Academico y Biblioteca ⏳ PENDIENTE

| Dia | Entregable | Estado |
|:---|:---|:---|
| 4 | Conexion con Supabase, RBAC, CRUD de asignaturas | Pendiente |
| 5 | Biblioteca digital: upload, busqueda, descarga de materiales | Pendiente |

### Oleada 3 — Finanzas y Admin ⏳ PENDIENTE

| Dia | Entregable | Estado |
|:---|:---|:---|
| 6 | Modulo de aranceles y facturacion | Pendiente |
| 7 | Admin dashboard, reportes, refactorizacion | Pendiente |

---

## 8. Criterios de Lanzamiento (Definition of Done)

El MVP esta "listo para lanzar" cuando se cumplen **todas** las siguientes condiciones:

### Funcionalidad

- [ ] Un aspirante puede registrarse y recibir confirmacion
- [ ] Un usuario puede autenticarse con email/password
- [ ] El JWT se genera, almacena y adjunta a peticiones correctamente
- [ ] El dashboard muestra perfil, materias y estado de matricula
- [ ] La biblioteca digital permite subir, buscar y descargar materiales
- [ ] RBAC funciona: cada rol solo accede a sus funcionalidades

### Rendimiento

- [ ] La landing page carga en menos de 2 segundos
- [ ] El dashboard carga en menos de 2 segundos
- [ ] La busqueda de materiales responde en menos de 500ms
- [ ] La aplicacion funciona en dispositivos moviles (responsive)

### Calidad

- [ ] No hay errores criticos en consola del navegador
- [ ] Los formularios validan correctamente los datos
- [ ] Los mensajes de error son claros y en espanol
- [ ] La navegacion entre rutas funciona sin recargar la pagina

### Seguridad

- [ ] Las rutas protegidas redirigen al login si no hay token
- [ ] El token expira y obliga re-autenticacion
- [ ] Los passwords no se almacenan en texto plano
- [ ] Supabase RLS esta configurado para datos criticos

### Despliegue

- [ ] La aplicacion esta desplegada en un dominio accesible
- [ ] El build de produccion funciona correctamente
- [ ] No hay archivos .env o secrets en el repositorio

---

## 9. Backlog para Version 2.0

Funcionalidades diferidas que se construiran despues del MVP validado:

| Funcionalidad | Trigger para incluir |
|:---|:---|
| App movil (React Native o Flutter) | 1000+ usuarios activos |
| Chat en tiempo real | Solicitud de usuarios |
| Notificaciones push | Modulo de comunicaciones activo |
| Evaluacion docente | Modulo academico consolidado |
| Reportes exportables (PDF/Excel) | Solicitud de administracion |
| Multi-idioma | Expansion a otros paises |
| Modo offline | Uso en zonas con conectividad limitada |
| Integracion con LMS | Convenio con plataforma externa |

---

## Apéndice

### Glosario

| Termino | Definicion |
|:---|:---|
| **MVP** | Minimum Viable Product — producto minimo viable |
| **RBAC** | Role-Based Access Control — control de acceso basado en roles |
| **JWT** | JSON Web Token — estandar de autenticacion stateless |
| **RLS** | Row Level Security — seguridad a nivel de fila en PostgreSQL |
| **SPA** | Single Page Application — app que carga una vez y navega sin recargar |
| **Definition of Done** | Criterios que deben cumplirse para considerar una tarea completada |
| **Should-Have** | Funcionalidad deseable pero no critica para el MVP |
| **Could-Have** | Funcionalidad opcional que se incluye si hay tiempo |

---

*Documento generado como parte de la planificacion del proyecto ITSU.*
