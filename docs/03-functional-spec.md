# Functional Specification — ITSU



## 1. Propósito del Documento

Este documento define **qué hace** el sistema ITSU desde la perspectiva del usuario. Describe cada funcionalidad, cada flujo de interacción, y cada regla de negocio sin detallar la implementación técnica. Es la referencia que resuelve la pregunta *"¿qué debe hacer el producto?"*.

Para la especificación técnica (cómo se implementa), consultar `04-technical-spec.md`.

---

## 2. Resumen del Sistema

ITSU es una plataforma web que permite a estudiantes, docentes y personal administrativo de un instituto tecnologico gestionar procesos academicos y administrativos desde un navegador web. El sistema opera bajo un modelo de tres portales con control de acceso basado en roles (RBAC).

### 2.1 Alcance funcional del MVP

| Modulo | Funcionalidades incluidas |
|:---|:---|
| **Landing Page** | Pagina publica con informacion institucional y CTAs de auth |
| **Autenticacion** | Registro, login, logout, persistencia de sesion |
| **Dashboard Estudiante** | Perfil, estado de matricula, materias inscritas |
| **Biblioteca Digital** | Repositorio de materiales por materia (Fase 2) |
| **RBAC** | Control de acceso por rol (Fase 2) |

### 2.2 Roles del sistema

| Rol | Descripcion | Portales que accede |
|:---|:---|:---|
| **Estudiante** | Aspirante o alumno matriculado | Landing, Dashboard Estudiante, Biblioteca Digital |
| **Docente** | Profesor que imparte asignaturas | Landing, Dashboard Docente, Biblioteca Digital (upload) |
| **Administrativo** | Staff del instituto | Landing, Panel Administrativo, todos los modulos |

---

## 3. Especificación por Modulo

### 3.1 Landing Page

#### 3.1.1 Propósito

Presentar la identidad institucional del ITSU y redirigir a usuarios interesados hacia el registro o login.

#### 3.1.2 Elementos de la página

| Elemento | Descripcion | Comportamiento |
|:---|:---|:---|
| **Header** | Barra superior fija con logo ITSU y botones de auth | Se encoge al scrollear >20px, se oculta al bajar >80px, reaparece al subir |
| **Hero** | Sección principal con titulo, descripcion y puntos clave | Muestra "Campus digital" como eyebrow, titulo del instituto, 3 puntos de valor |
| **Panel informativo** | Tarjeta lateral dentro del hero | Muestra titulo y descripcion sobre la interfaz del sistema |
| **Seccion "Sobre el instituto"** | Bloque de texto descriptivo | Titulo + parrafo con la mision del instituto |
| **Seccion "Valores"** | Grid de 3 tarjetas | Excelencia academica, Integridad institucional, Innovacion con IA |
| **Footer** | Pie de pagina con copyright | Texto estatico centrado |

#### 3.1.3 Comportamiento del Header (Scroll)

```
Scroll = 0px        → Header visible, tamaño normal, fondo transparente
Scroll > 20px       → Header visible, fondo solido, borde sutil
Scroll > 80px (bajar) → Header oculto (translateY(-120%))
Scroll < 80px (subir) → Header vuelve a mostrarse
```

#### 3.1.4 Responsive

| Breakpoint | Comportamiento |
|:---|:---|
| > 960px | Layout desktop: hero en 2 columnas, grid de valores en 3 columnas |
| ≤ 960px | Layout tablet: hero en 1 columna, grid en 1 columna |
| ≤ 720px | Layout movil: header vertical, botones de auth apilados, padding reducido |

---

### 3.2 Autenticacion

#### 3.2.1 Propósito

Permitir a los usuarios crear cuentas (registro) e iniciar sesion (login) de forma segura.

#### 3.2.2 Flujo de Registro

```
Pasos del usuario:
1. Visita la landing page (/)
2. Hace clic en "Registrarse" (header o CTA)
3. Se abre un modal overlay sobre la landing
4. Completa el formulario de registro
5. El sistema valida y envia los datos
6. Si es exitoso: redirige al dashboard
7. Si falla: muestra error en el modal
```

#### 3.2.3 Formulario de Registro

| Campo | Tipo | Obligatorio | Validacion |
|:---|:---|:---|:---|
| Email | email | Si | Formato valido, unico en la BD |
| Password | password | Si | Minimo 8 caracteres |
| Cedula de identidad | text | Si | Unico en la BD |
| Primer nombre | text | Si | No vacio |
| Segundo nombre | text | No | — |
| Primer apellido | text | Si | No vacio |
| Segundo apellido | text | No | — |
| Telefono | tel | No | — |

**Organizacion visual del formulario:**
- Grupo 1: Datos de cuenta (email, password)
- Grupo 2: Datos personales (cedula, nombres, apellidos, telefono)
- Cada grupo tiene un borde redondeado y fondo diferenciado

**Comportamiento de errores:**

| Error | Codigo HTTP | Mensaje mostrado |
|:---|:---|:---|
| Email duplicado | 409 | "Este correo electronico o cedula ya se encuentra registrado." |
| Campos invalidos | 422 | Lista de campos con errores especificos |
| Error del servidor | 500 | "Error del servidor. Intenta de nuevo mas tarde." |

#### 3.2.4 Flujo de Login

```
Pasos del usuario:
1. Hace clic en "Iniciar Sesion"
2. Se abre un modal overlay
3. Ingresa email y password
4. El sistema verifica credenciales
5. Si son correctas: guarda token + usuario, redirige al dashboard
6. Si falla: muestra "Correo o contrasena incorrectos." (no revela cual)
```

#### 3.2.5 Formulario de Login

| Campo | Tipo | Obligatorio | Validacion |
|:---|:---|:---|:---|
| Email | email | Si | Formato valido |
| Password | password | Si | No vacio |

**Comportamiento de errores:**

| Error | Codigo HTTP | Mensaje mostrado |
|:---|:---|:---|
| Credenciales invalidas | 401 | "Correo o contrasena incorrectos." |
| Error del servidor | 500 | "Error del servidor. Intenta de nuevo mas tarde." |

#### 3.2.6 Persistencia de Sesion

| Aspecto | Comportamiento |
|:---|:---|
| Donde se almacena el token | `localStorage` con clave `itsu_token` |
| Donde se almacenan los datos del usuario | `localStorage` con clave `itsu_user` (JSON serializado) |
| Duracion de la sesion | Persiste hasta que el usuario haga logout o el token expire |
| Comportamiento al recargar la pagina | La sesion se mantiene (se hidrata desde localStorage) |
| Comportamiento al hacer logout | Se eliminan token y usuario de localStorage, estado reseteado a null |

#### 3.2.7 Modal Overlay

| Aspecto | Comportamiento |
|:---|:---|
| Visualizacion | Superpuesto sobre la landing page con fondo oscuro semitransparente |
| Cerrar (click en backdrop) | Navega a "/" (cierra el modal) |
| Cerrar (boton X) | Navega a "/" (cierra el modal) |
| Cerrar (click dentro del modal) | NO cierra (stopPropagation) |
| Navegacion entre login/register | Click en "No tienes cuenta?" / "Ya tengo cuenta" |
| Animacion | Backdrop con blur, modal con sombra y bordes redondeados |

---

### 3.3 Dashboard del Estudiante

#### 3.3.1 Propósito

Mostrar al estudiante autenticado su informacion personal, estado de matricula y materias inscritas.

#### 3.3.2 Acceso

- Ruta: `/dashboard`
- Requisito: Estar autenticado (ProtectedRoute)
- Si no esta autenticado: redirige a `/` (landing page)

#### 3.3.3 Layout

```
┌─────────────────────────────────────────────┐
│  Header: "Panel" / "Dashboard del estudiante" │
├──────────┬──────────────────────────────────┤
│ SIDEBAR  │  CONTENIDO PRINCIPAL              │
│          │                                    │
│ - Avatar │  ┌─ Seccion Bienvenida ──────┐    │
│ - Nombre │  │  "Bienvenido, [nombre]"   │    │
│ - Cedula │  │  "Instituto Tecnologico"  │    │
│ - Email  │  │  [Boton Entrar]           │    │
│          │  └───────────────────────────┘    │
│ Naveg.   │                                    │
│ - Inicio │  ┌─ Perfil del Estudiante ───┐    │
│ - Mater. │  │  [Avatar] Nombre          │    │
│ - Horar. │  │  "Estudiante del ITSU"    │    │
│          │  └───────────────────────────┘    │
│          │                                    │
│          │  ┌─ Estado de Matricula ─────┐    │
│          │  │  [Badge: Activo]          │    │
│          │  └───────────────────────────┘    │
│          │                                    │
│          │  ┌─ Materias Inscritas ──────┐    │
│          │  │  Lista de clases          │    │
│          │  └───────────────────────────┘    │
│          │                                    │
│ [Logout] │                                    │
└──────────┴──────────────────────────────────┘
```

#### 3.3.4 Sidebar

| Elemento | Descripcion |
|:---|:---|
| **Avatar** | Inicial del nombre del usuario en circulo gris |
| **Nombre** | Nombre completo del estudiante (font-weight: 800) |
| **Cedula** | Numero de cedula del estudiante |
| **Email** | Correo electronico del estudiante |
| **Navegacion** | Links a sub-secciones del dashboard (Inicio, Materias, Horarios) |
| **Logout** | Boton que cierra sesion y redirige a la landing |

#### 3.3.5 Seccion de Bienvenida

| Elemento | Descripcion |
|:---|:---|
| **Titulo** | "Bienvenido, [nombre del estudiante]" |
| **Subtitulo** | "Instituto Tecnologico Sitio Uno" |
| **Boton "Entrar"** | Scroll suave hacia la seccion de perfil |

#### 3.3.6 Perfil del Estudiante

| Elemento | Descripcion |
|:---|:---|
| **Avatar** | Inicial del nombre en circulo de 60px |
| **Nombre completo** | Nombre y apellidos del estudiante |
| **Descripcion** | "Estudiante del Instituto ITSU" |

#### 3.3.7 Estado de Matricula

El sistema muestra un badge con color segun el estado:

| Estado | Color de fondo | Color de texto | Label mostrado |
|:---|:---|:---|:---|
| `activo` | Verde claro (#dcfce7) | Verde oscuro (#166534) | "Activo" |
| `suspendido` | Rojo claro (#fef2f2) | Rojo oscuro (#991b1b) | "Suspendido" |
| `egresado` | Azul claro (#dbeafe) | Azul oscuro (#1e40af) | "Egresado" |
| Sin estado | — | — | "Sin estado" |

#### 3.3.8 Materias Inscritas

Cada materia se muestra como una tarjeta con la siguiente informacion:

| Campo | Descripcion |
|:---|:---|
| **Codigo** | Codigo de la materia (ej: "MAT101"), en color azul |
| **Nombre** | Nombre completo de la materia |
| **Profesor** | Nombre del docente asignado |
| **Horario** | Dias y horas de clase |
| **Aula** | Salon donde se imparte |

**Layout de la tarjeta (desktop):**
```
[90px: Codigo] [1fr: Nombre] [150px: Profesor] [120px: Horario] [60px: Aula]
```

**Layout de la tarjeta (movil ≤960px):**
```
[1 columna: todo apilado verticalmente]
```

#### 3.3.9 Estados de Carga

| Estado | Comportamiento |
|:---|:---|
| **Cargando** | Muestra "Cargando dashboard..." en el contenido principal |
| **Error** | Muestra banner rojo con el mensaje de error |
| **Exito** | Muestra el dashboard completo con todos los datos |

---

### 3.4 Biblioteca Digital (Fase 2)

#### 3.4.1 Propósito

Permitir a los estudiantes acceder a materiales de estudio organizados por materia, y a los docentes subir y gestionar esos materiales.

#### 3.4.2 Vista del Estudiante

```
Pasos del usuario:
1. Accede a "Mis Materias" en el dashboard
2. Se lista las materias inscritas en el periodo actual
3. Selecciona una materia
4. Se muestran los materiales disponibles
5. Puede buscar, filtrar, previsualizar y descargar
```

**Funcionalidades:**

| Funcionalidad | Descripcion |
|:---|:---|
| **Listado de materias** | Muestra solo las materias donde el estudiante esta inscrito |
| **Repositorio por materia** | Materiales organizados por unidad tematica > tipo de recurso |
| **Busqueda** | Filtrado en tiempo real por nombre, tipo o unidad |
| **Vista previa** | Preview de documentos PDF sin descargar |
| **Descarga** | Descarga directa del archivo |

#### 3.4.3 Vista del Docente

```
Pasos del usuario:
1. Se autentica y accede a su dashboard
2. Selecciona la materia que imparte
3. Hace clic en "Subir material"
4. Completa: titulo, unidad tematica, tipo, archivo
5. El sistema guarda el archivo
6. El material aparece para los estudiantes inscritos
```

**Formulario de upload:**

| Campo | Tipo | Obligatorio | Validacion |
|:---|:---|:---|:---|
| Titulo del material | text | Si | No vacio |
| Unidad tematica | select | Si | Debe seleccionar una unidad |
| Tipo de recurso | select | Si | PDF, Documento, Enlace, Video |
| Archivo | file | Si (si no es enlace) | Maximo 50MB, tipos permitidos |
| URL | url | Si (si es enlace) | Formato valido |

**Restricciones de upload:**

| Restriccion | Valor |
|:---|:---|
| Tamano maximo de archivo | 50MB |
| Tipos permitidos | .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .jpg, .jpeg, .png, .mp4, .webm |
| Permisos | Solo el docente asignado a la materia puede subir |

---

### 3.5 RBAC — Control de Acceso por Roles (Fase 2)

#### 3.5.1 Propósito

Garantizar que cada usuario solo pueda acceder a las funcionalidades y datos correspondientes a su rol.

#### 3.5.2 Matriz de Permisos

| Recurso / Accion | Estudiante | Docente | Administrativo |
|:---|:---|:---|:---|
| Ver landing page | Si | Si | Si |
| Registrarse | Si | Si | Si |
| Iniciar sesion | Si | Si | Si |
| Ver su perfil | Si | Si | Si |
| Ver sus materias inscritas | Si | Si | Si |
| Ver materiales de sus materias | Si | Si | Si |
| Descargar materiales | Si | Si | Si |
| Subir materiales | No | Si (asignadas) | Si |
| Cargar calificaciones | No | Si (asignadas) | Si |
| Registrar asistencia | No | Si (asignadas) | Si |
| Ver todas las materias | No | No | Si |
| Gestionar periodos academicos | No | No | Si |
| Gestionar usuarios | No | No | Si |
| Ver reportes y analiticas | No | No | Si |
| Auditar cambios | No | No | Si |

---

## 4. Reglas de Negocio

### 4.1 Registro

| Regla | Descripcion |
|:---|:---|
| RN-01 | El email debe ser unico en toda la base de datos |
| RN-02 | La cedula debe ser unica en toda la base de datos |
| RN-03 | El password debe tener minimo 8 caracteres |
| RN-04 | Al registrarse, el usuario se crea con rol "estudiante" por defecto |
| RN-05 | Despues del registro exitoso, el usuario queda autenticado automaticamente |
| RN-06 | Si el email o cedula ya existen, retorna error 409 |

### 4.2 Login

| Regla | Descripcion |
|:---|:---|
| RN-07 | El sistema valida credenciales contra Supabase Auth |
| RN-08 | Si las credenciales son correctas, genera un JWT con claims de rol |
| RN-09 | Si las credenciales son incorrectas, retorna error 401 con mensaje generico |
| RN-10 | El mensaje de error NO revela si fallo el email o el password |

### 4.3 Sesion

| Regla | Descripcion |
|:---|:---|
| RN-11 | El token JWT se almacena en localStorage con clave `itsu_token` |
| RN-12 | Los datos del usuario se almacenan en localStorage con clave `itsu_user` |
| RN-13 | Al recargar la pagina, la sesion se hidrata desde localStorage |
| RN-14 | Al hacer logout, se eliminan ambos valores de localStorage |
| RN-15 | Si el token expira, el usuario debe re-autenticarse |

### 4.4 Dashboard

| Regla | Descripcion |
|:---|:---|
| RN-16 | Solo usuarios autenticados pueden acceder a `/dashboard` |
| RN-17 | Los datos del estudiante se cargan desde `GET /api/dashboard` |
| RN-18 | El sidebar muestra informacion del usuario logueado |
| RN-19 | El estado de matricula se muestra con badge de color |

### 4.5 Biblioteca Digital

| Regla | Descripcion |
|:---|:---|
| RN-20 | Solo se muestran materias donde el estudiante esta inscrito |
| RN-21 | Solo docentes asignados pueden subir materiales a una materia |
| RN-22 | Los archivos se almacenan en Supabase Storage |
| RN-23 | Los materiales son visibles inmediatamente despues del upload |
| RN-24 | El tamano maximo por archivo es de 50MB |

---

## 5. Mensajes de Error del Sistema

### 5.1 Errores de Autenticacion

| Codigo HTTP | Contexto | Mensaje mostrado al usuario |
|:---|:---|:---|
| 401 | Login fallido | "Correo o contrasena incorrectos." |
| 401 | Token expirado | "Tu sesion ha expirado. Inicia sesion de nuevo." |
| 403 | Sin permisos | "No tienes permiso para realizar esta accion." |
| 409 | Email/cedula duplicado | "Este correo electronico o cedula ya se encuentra registrado." |
| 422 | Campos invalidos | Lista de campos con errores especificos |
| 500 | Error del servidor | "Error del servidor. Intenta de nuevo mas tarde." |

### 5.2 Errores de Formulario

| Campo | Error comun | Mensaje |
|:---|:---|:---|
| email | Formato invalido | "Ingresa un correo electronico valido." |
| email | Requerido | "El correo electronico es obligatorio." |
| password | Muy corto | "La contrasena debe tener al menos 8 caracteres." |
| password | Requerido | "La contrasena es obligatoria." |
| cedula | Requerido | "La cedula de identidad es obligatoria." |
| cedula | Duplicado | "Esta cedula ya se encuentra registrada." |
| primer_nombre | Requerido | "El primer nombre es obligatorio." |
| primer_apellido | Requerido | "El primer apellido es obligatorio." |

---

## 6. Flujos de Navegacion

### 6.1 Mapa de rutas

| Ruta | Componente | Requiere auth | Descripcion |
|:---|:---|:---|:---|
| `/` | LandingPage | No | Pagina principal publica |
| `/iniciar-sesion` | AuthOverlay (mode="login") | No | Modal de login sobre la landing |
| `/registro` | AuthOverlay (mode="register") | No | Modal de registro sobre la landing |
| `/dashboard` | DashboardLayout > DashboardPage | Si | Panel del estudiante |
| `*` | Navigate to `/` | No | Catch-all: redirige al inicio |

### 6.2 Diagrama de navegacion

```
                    ┌─────────┐
                    │   /     │
                    │ Landing │
                    └────┬────┘
                         │
            ┌────────────┼────────────┐
            │            │            │
     Click "Login"  Click "Reg."  Click "Dashboard"
            │            │            │
     ┌──────▼──────┐ ┌──▼─────────┐  │
     │ /iniciar-   │ │ /registro  │  │
     │ sesion      │ │            │  │
     │ (Modal)     │ │ (Modal)    │  │
     └──────┬──────┘ └──┬─────────┘  │
            │            │            │
            │ Login OK   │ Reg. OK    │
            │            │            │
            └────────────┼────────────┘
                         │
                  ┌──────▼──────┐
                  │ /dashboard  │
                  │ (Protegida) │
                  └─────────────┘
```

---

## 7. Comportamientos Responsive

### 7.1 Breakpoints

| Nombre | Ancho | Device tipico |
|:---|:---|:---|
| Desktop | > 960px | Laptop, monitor |
| Tablet | 721px - 960px | iPad, tablet |
| Movil | ≤ 720px | Smartphone |

### 7.2 Comportamientos por breakpoint

| Elemento | Desktop (>960px) | Tablet (≤960px) | Movil (≤720px) |
|:---|:---|:---|:---|
| Header | Horizontal, logo + botones a la derecha | Horizontal, botones apilados | Vertical, botones full-width |
| Hero | 2 columnas (copy + visual) | 1 columna | 1 columna |
| Grid de valores | 3 columnas | 1 columna | 1 columna |
| Dashboard layout | 2 columnas (sidebar 260px + contenido) | 1 columna | 1 columna |
| Tarjetas de materias | 5 columnas (codigo, nombre, profesor, horario, aula) | 1 columna apilada | 1 columna apilada |
| Summary grid | 3 columnas | 2 columnas | 1 columna |

---

## 8. Accesibilidad

### 8.1 Requerimientos

| Requisito | Implementacion |
|:---|:---|
| Navegacion por teclado | Todos los elementos interactivos son focusables |
| Labels ARIA | Modal usa `role="dialog"` y `aria-modal="true"` |
| Botones con aria-label | Boton de cerrar modal tiene `aria-label="Cerrar"` |
| Contraste de colores | Texto principal (#11213d) sobre fondo claro (#eef2f7) |
| Tamanos de fuente | Font base 1rem, titulos con clamp() para escalar |
| Touch targets | Botones minimos 44px de altura para dispositivos moviles |

### 8.2 Labels de campos de formulario

| Campo | Label visible |
|:---|:---|
| email | "Correo electronico" |
| password | "Contrasena" |
| cedula_identidad | "Cedula de identidad" |
| primer_nombre | "Primer nombre" |
| segundo_nombre | "Segundo nombre" |
| primer_apellido | "Primer apellido" |
| segundo_apellido | "Segundo apellido" |
| telefono | "Telefono" |

---

## 9. Estados de Interfaz

### 9.1 Estados del Header

| Estado | Condicion | Estilo |
|:---|:---|:---|
| Default | scroll = 0 | Fondo rgba(12,22,42,0.82), sin borde, sin sombra |
| Scrolled | scroll > 20px | Fondo rgba(12,22,42,0.94), borde blanco 8%, sombra |
| Hidden | scroll > 80px y bajando | translateY(-120%), transicion 240ms |

### 9.2 Estados de formularios de auth

| Estado | Comportamiento |
|:---|:---|
| Idle | Botones habilitados, campos vacios |
| Enviando | Botones deshabilitados, texto de carga |
| Exito | Redirige automaticamente |
| Error | Muestra banner de error arriba del formulario |
| Error por campo | Borde rojo en el campo + mensaje debajo |

### 9.3 Estados del dashboard

| Estado | Comportamiento |
|:---|:---|
| Cargando | Muestra "Cargando dashboard..." |
| Error | Banner rojo con mensaje de error |
| Sin datos | Muestra secciones vacias con valores por defecto |
| Con datos | Muestra perfil, matricula y materias |

---

*Documento generado como parte de la planificacion del proyecto ITSU.*
