# Technical Specification — ITSU

> **Version:** 1.0  
> **Fecha:** Julio 2026  
> **Estado:** Fase 1 completada, Fase 2 en planificacion

---

## 1. Propósito del Documento

Este documento define **cómo se implementa** el sistema ITSU a nivel técnico. Describe la arquitectura, la estructura de datos, los endpoints del API, los modelos de componentes, y las decisiones de diseño del código. Es la referencia que resuelve la pregunta *"¿cómo funciona internamente?"*.

Para la especificación funcional (qué hace el producto), consultar `03-functional-spec.md`.

---

## 2. Arquitectura General

### 2.1 Diagrama de componentes

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                               │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Landing  │  │  Auth    │  │Dashboard │  │Biblioteca│   │
│  │  Page    │  │ Overlay  │  │  Layout  │  │ Digital  │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │              │              │              │          │
│  ┌────▼──────────────▼──────────────▼──────────────▼─────┐  │
│  │                    React Router                        │  │
│  │              (BrowserRouter + Lazy Loading)             │  │
│  └────────────────────────┬──────────────────────────────┘  │
│                           │                                  │
│  ┌────────────────────────▼──────────────────────────────┐  │
│  │                  AuthContext                           │  │
│  │          (JWT + localStorage + useAuth)                │  │
│  └────────────────────────┬──────────────────────────────┘  │
│                           │                                  │
│  ┌────────────────────────▼──────────────────────────────┐  │
│  │                  httpClient.js                         │  │
│  │        (fetch + JWT header + error handling)            │  │
│  └────────────────────────┬──────────────────────────────┘  │
│                           │                                  │
└───────────────────────────┼──────────────────────────────────┘
                            │
                     HTTP/REST API
                            │
┌───────────────────────────▼──────────────────────────────────┐
│                      SERVER (Node.js)                         │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Auth Module  │  │Academico Mod │  │Materiales Mod│       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
│         │                  │                  │                │
│  ┌──────▼──────────────────▼──────────────────▼───────┐      │
│  │              Supabase Client SDK                     │      │
│  └────────────────────────┬───────────────────────────┘      │
│                           │                                   │
└───────────────────────────┼───────────────────────────────────┘
                            │
┌───────────────────────────▼───────────────────────────────────┐
│                     SUPABASE                                   │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ PostgreSQL   │  │ Supabase     │  │ Supabase     │        │
│  │ Database     │  │ Auth         │  │ Storage      │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 2.2 Stack Tecnologico

| Capa | Tecnologia | Version | Funcion |
|:---|:---|:---|:---|
| **Frontend** | React | 19.x | Libreria de UI basada en componentes |
| **Bundler** | Vite | 8.x | Dev server + build tool |
| **Router** | React Router | 7.x | Enrutamiento SPA con lazy loading |
| **Backend** | Node.js | LTS | Runtime para logica de negocio |
| **Framework HTTP** | Express o Fastify | — | API REST |
| **Auth** | Supabase Auth | — | JWT, OAuth, magic links |
| **Database** | Supabase (PostgreSQL) | — | Base de datos relacional |
| **Storage** | Supabase Storage | — | Archivos de la biblioteca digital |
| **Versionamiento** | Git + GitHub | — | Control de versiones |

---

## 3. Estructura del Proyecto

```
instituto_sitio_uno/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
│
├── public/
│   ├── favicon.svg
│   ├── hero-visual.svg
│   └── ITSU.webp
│
├── src/
│   ├── main.jsx                    # Punto de entrada
│   ├── App.jsx                     # Shell raiz (Outlet)
│   ├── App.css                     # Estilos de la app
│   ├── index.css                   # Estilos globales + tipografia
│   │
│   ├── components/                 # Componentes reutilizables (landing)
│   │   ├── index.js                # Barrel export
│   │   ├── BrandHeader.jsx
│   │   ├── HeroSection.jsx
│   │   ├── HeroCopy.jsx
│   │   ├── HeroPanel.jsx
│   │   ├── SectionHeading.jsx
│   │   ├── ValueGrid.jsx
│   │   └── SiteFooter.jsx
│   │
│   ├── contexts/
│   │   └── AuthContext.jsx         # Contexto global de auth
│   │
│   ├── hooks/
│   │   └── useHeaderScroll.js      # Hook de scroll para header
│   │
│   ├── layouts/
│   │   └── DashboardLayout.jsx     # Layout de dos columnas
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── AuthOverlay.jsx
│   │
│   ├── router/
│   │   ├── index.jsx               # createBrowserRouter
│   │   ├── routes.jsx              # Definicion de rutas
│   │   └── ProtectedRoute.jsx      # Guard de autenticacion
│   │
│   ├── services/
│   │   ├── httpClient.js           # Cliente HTTP con JWT
│   │   └── errorHandler.js         # Parseo de errores API
│   │
│   └── features/
│       ├── auth/
│       │   ├── components/
│       │   │   ├── LoginPage.jsx
│       │   │   ├── LoginForm.jsx
│       │   │   ├── RegisterPage.jsx
│       │   │   ├── RegisterForm.jsx
│       │   │   └── FormError.jsx
│       │   └── services/
│       │       └── authService.js
│       │
│       └── dashboard/
│           ├── components/
│           │   ├── Sidebar.jsx
│           │   └── EnrolledClasses.jsx
│           └── services/
│               └── dashboardService.js
│
├── docs/
│   ├── product-brief.md
│   ├── 02-mvp-scope.md
│   ├── 03-functional-spec.md
│   ├── 04-technical-spec.md
│   └── ...
│
└── dist/                           # Build de produccion
```

---

## 4. Arquitectura de Componentes React

### 4.1 Arbol de componentes

```
<StrictMode>
  <AuthProvider>
    <RouterProvider>
      <App>                          # Shell raiz, renderiza <Outlet />
        <Suspense>
          │
          ├── <LandingPage>          # /
          │   ├── <BrandHeader>
          │   │   └── useHeaderScroll()
          │   ├── <HeroSection>
          │   │   ├── <HeroCopy>
          │   │   └── <HeroPanel>
          │   ├── <SectionHeading>
          │   ├── <ValueGrid>
          │   └── <SiteFooter>
          │
          ├── <AuthOverlay>          # /iniciar-sesion, /registro
          │   ├── <LandingPage>      # Detras del overlay
          │   └── <LoginPage> | <RegisterPage>
          │       └── <LoginForm> | <RegisterForm>
          │           └── <FormError>
          │
          └── <ProtectedRoute>       # /dashboard
              └── <DashboardLayout>
                  ├── <Sidebar>
                  └── <Outlet>
                      └── <DashboardPage>
                          └── <EnrolledClasses>
```

### 4.2 Componentes — Propiedades y Estado

#### App.jsx

| Propiedad | Tipo | Descripcion |
|:---|:---|:---|
| — | — | Shell raiz, solo renderiza `<Outlet />` |

**Estado:** Ninguno.

#### BrandHeader.jsx

| Propiedad | Tipo | Descripcion |
|:---|:---|:---|
| — | — | Componente sin props |

**Hooks internos:**
- `useHeaderScroll()` → `{ isScrolled, isHidden }`

**Estado derivado:** Ninguno local. El comportamiento visual depende de `isScrolled` e `isHidden`.

#### HeroSection.jsx

| Propiedad | Tipo | Descripcion |
|:---|:---|:---|
| `content` | Object | Objeto con `eyebrow`, `title`, `description`, `points`, `panelLabel`, `panelTitle`, `panelText` |

**Estructura del prop `content`:**
```js
{
  eyebrow: string,
  title: string,
  description: string,
  points: string[],
  panelLabel: string,
  panelTitle: string,
  panelText: string,
}
```

#### SectionHeading.jsx

| Propiedad | Tipo | Descripcion |
|:---|:---|:---|
| `eyebrow` | string | Etiqueta pequena encima del titulo |
| `title` | string | Titulo de la seccion |

#### ValueGrid.jsx

| Propiedad | Tipo | Descripcion |
|:---|:---|:---|
| `items` | Array | Array de objetos `{ label, title, description }` |

#### SiteFooter.jsx

| Propiedad | Tipo | Descripcion |
|:---|:---|:---|
| — | — | Componente sin props, contenido estatico |

#### AuthOverlay.jsx

| Propiedad | Tipo | Descripcion |
|:---|:---|:---|
| `mode` | "login" \| "register" | Controla que formulario se muestra |

**Hooks internos:**
- `useNavigate()` — Para navegar al cerrar el modal

**Comportamiento:**
- Click en backdrop → `navigate('/')`
- Click en boton X → `navigate('/')`
- Click dentro del modal → `e.stopPropagation()`

#### LoginPage.jsx

| Propiedad | Tipo | Descripcion |
|:---|:---|:---|
| `onSwitchToRegister` | Function | Callback para navegar al registro |

**Estado local:**
- `email: string`
- `password: string`
- `error: string | null`
- `loading: boolean`

**Flujo de datos:**
1. Usuario llena formulario
2. Click en "Iniciar Sesion" → llama `login(email, password)` de `AuthContext`
3. Exito → `navigate('/dashboard')`
4. Error → `setError(friendlyMessage)` de `parseServerError()`

#### RegisterForm.jsx

| Propiedad | Tipo | Descripcion |
|:---|:---|:---|
| `onSwitchToLogin` | Function | Callback para navegar al login |

**Estado local:**
- `formData: { email, password, cedula_identidad, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono }`
- `fieldErrors: Object` — Errores por campo
- `serverError: string | null` — Error general del servidor
- `loading: boolean`

**Flujo de datos:**
1. Usuario llena formulario
2. Click en "Registrarse" → llama `registerStudent(formData)` de `authService`
3. Exito → llama `login(email, password)` → `navigate('/dashboard')`
4. Error → `parseServerError()` → `setFieldErrors()` + `setServerError()`

#### DashboardLayout.jsx

| Propiedad | Tipo | Descripcion |
|:---|:---|:---|
| — | — | Componente sin props |

**Estructura:**
- Header con "Panel" eyebrow y "Dashboard del estudiante"
- Layout de dos columnas: `<Sidebar />` + `<Outlet />`

#### Sidebar.jsx

| Propiedad | Tipo | Descripcion |
|:---|:---|:---|
| — | — | Componente sin props |

**Hooks internos:**
- `useAuth()` → `{ user, logout }`

**Renderiza:**
- Avatar con inicial del nombre
- Nombre, cedula, email del usuario
- Navegacion (links)
- Boton de logout

#### DashboardPage.jsx

| Propiedad | Tipo | Descripcion |
|:---|:---|:---|
| — | — | Componente sin props |

**Hooks internos:**
- `useAuth()` → `{ user }`
- `useNavigate()` — Para scroll suave
- `useState()` — `{ data, loading, error }`
- `useEffect()` — Carga datos al montar

**Flujo de datos:**
1. Al montar: `getDashboardData()` → `setData(data)` o `setError(error)`
2. Rendering condicional: loading → error → success
3. En success: muestra perfil, matricula y materias

**Estado local:**
- `data: { student: { estado_matricula, ... }, classes: [...] } | null`
- `loading: boolean`
- `error: Error | null`

#### EnrolledClasses.jsx

| Propiedad | Tipo | Descripcion |
|:---|:---|:---|
| `classes` | Array | Array de objetos de materias inscritas |

**Estructura de cada item en `classes`:**
```js
{
  codigo: string,      // Ej: "MAT101"
  nombre: string,      // Ej: "Matematicas I"
  profesor: string,    // Ej: "Ing. Carlos Perez"
  horario: string,     // Ej: "Lun-Vie 8:00-10:00"
  aula: string,        // Ej: "A-301"
}
```

---

## 5. Sistema de Autenticacion

### 5.1 AuthContext

**Archivo:** `src/contexts/AuthContext.jsx`

**Proporciona:**

| Propiedad | Tipo | Descripcion |
|:---|:---|:---|
| `user` | Object \| null | Datos del usuario logueado |
| `token` | string \| null | JWT token |
| `isAuthenticated` | boolean | `!!token && !!user` |
| `login` | async function | Autentica contra el API |
| `logout` | function | Cierra sesion, limpia localStorage |

**Constantes de localStorage:**

| Clave | Contenido | Tipo |
|:---|:---|:---|
| `itsu_token` | JWT token | string |
| `itsu_user` | Datos del usuario | JSON serializado |

**Funciones helper internas:**

| Funcion | Descripcion |
|:---|:---|
| `getToken()` | Lee `itsu_token` de localStorage |
| `setToken(token)` | Escribe `itsu_token` en localStorage |
| `removeToken()` | Elimina `itsu_token` de localStorage |
| `getUser()` | Lee y parsea `itsu_user` de localStorage |
| `setUser(user)` | Escribe `itsu_user` como JSON en localStorage |
| `removeUser()` | Elimina `itsu_user` de localStorage |

### 5.2 authService.js

**Archivo:** `src/features/auth/services/authService.js`

**Funciones exportadas:**

| Funcion | Parametros | Retorna | Endpoint |
|:---|:---|:---|:---|
| `loginUser` | `{ email, password }` | `{ user, token }` | `POST /api/auth/login` |
| `registerStudent` | `formData` | `{ user, token }` | `POST /api/auth/register` |

### 5.3 ProtectedRoute.jsx

**Archivo:** `src/router/ProtectedRoute.jsx`

**Comportamiento:**
- Si `isAuthenticated === true` → renderiza `children`
- Si `isAuthenticated === false` → `<Navigate to="/" replace />`

---

## 6. Cliente HTTP

### 6.1 httpClient.js

**Archivo:** `src/services/httpClient.js`

**Metodos exportados:**

| Metodo | Verbo HTTP | Content-Type | Descripcion |
|:---|:---|:---|:---|
| `get(endpoint, options)` | GET | — | Obtener datos |
| `post(endpoint, body, options)` | POST | application/json | Enviar datos |
| `put(endpoint, body, options)` | PUT | application/json | Actualizar datos |
| `delete(endpoint, options)` | DELETE | — | Eliminar recurso |

**Configuracion automatica:**

| Aspecto | Comportamiento |
|:---|:---|
| URL base | `import.meta.env.VITE_API_BASE_URL` |
| Header Authorization | `Bearer ${token}` si existe token en localStorage |
| Content-Type | `application/json` por defecto |
| Errores | Lanza `ApiError` con `status` y `body` |

**Clase ApiError:**

```js
class ApiError extends Error {
  constructor(status, body) {
    const msg = typeof body?.error === 'string' ? body.error : `Error ${status}`
    super(msg)
    this.status = status    // Codigo HTTP
    this.body = body        // Respuesta completa del servidor
  }
}
```

### 6.2 errorHandler.js

**Archivo:** `src/services/errorHandler.js`

**Funciones exportadas:**

| Funcion | Parametros | Retorna |
|:---|:---|:---|
| `parseServerError(error)` | Error o ApiError | `{ status, serverMessage, friendly, fieldErrors }` |
| `formatFieldErrors(fieldErrors)` | Object \| null | Object `{ campo: "mensaje" }` |

**Mapa de errores HTTP:**

| Status | Mensaje friendly |
|:---|:---|
| 400 | "Error al enviar los datos. Verifica e intentalo de nuevo." |
| 401 | "Correo o contrasena incorrectos." |
| 403 | "No tienes permiso para realizar esta accion." |
| 404 | "El recurso solicitado no fue encontrado." |
| 409 | "Este correo electronico o cedula ya se encuentra registrado." |
| 422 | "Uno o mas campos no son validos. Revisalos e intenta de nuevo." |
| 500 | "Error del servidor. Intenta de nuevo mas tarde." |

**Mapa de labels de campos:**

| Campo tecnico | Label legible |
|:---|:---|
| `email` | "Correo electronico" |
| `password` | "Contrasena" |
| `primer_nombre` | "Primer nombre" |
| `primer_apellido` | "Primer apellido" |
| `cedula_identidad` | "Cedula de identidad" |
| `segundo_nombre` | "Segundo nombre" |
| `segundo_apellido` | "Segundo apellido" |
| `telefono` | "Telefono" |

---

## 7. Enrutamiento

### 7.1 Configuracion del Router

**Archivo:** `src/router/index.jsx`

- Usa `createBrowserRouter` de React Router 7
- Layout raiz: `<App />` (renderiza `<Outlet />`)
- Wrapper: `<Suspense>` con fallback "Cargando..."
- Las paginas se cargan con `React.lazy()` (code splitting)

### 7.2 Definicion de Rutas

**Archivo:** `src/router/routes.jsx`

| Ruta | Componente | Lazy? | Protegida? |
|:---|:---|:---|:---|
| `/` | `LandingPage` | Si | No |
| `/iniciar-sesion` | `AuthOverlay` (mode="login") | Si | No |
| `/registro` | `AuthOverlay` (mode="register") | Si | No |
| `/dashboard` | `DashboardLayout` > `DashboardPage` | Si | Si |
| `*` | `Navigate to="/" replace` | No | No |

**Implementacion del lazy loading:**
```js
const LandingPage = lazy(() =>
  import('../pages/LandingPage').then((m) => ({ default: m.LandingPage }))
)
```

---

## 8. Hooks Personalizados

### 8.1 useHeaderScroll

**Archivo:** `src/hooks/useHeaderScroll.js`

**Retorna:** `{ isScrolled: boolean, isHidden: boolean }`

**Logica:**

| Variable | Condicion | Valor |
|:---|:---|:---|
| `isScrolled` | `window.scrollY > 20` | true / false |
| `isHidden` | `currentScrollY > lastScrollY && currentScrollY > 80` | true / false |

**Optimizacion:**
- Throttling con `requestAnimationFrame`
- Listener registrado con `{ passive: true }`
- Cleanup en `return () => removeEventListener`

---

## 9. Estilos CSS

### 9.1 Variables CSS (Custom Properties)

**Archivo:** `src/App.css`

| Variable | Valor | Uso |
|:---|:---|:---|
| `--bg` | `#eef2f7` | Fondo de la pagina |
| `--surface` | `rgba(255,255,255,0.88)` | Superficies con transparencia |
| `--surface-strong` | `#ffffff` | Superficies opacas |
| `--surface-soft` | `rgba(16,34,65,0.06)` | Superficies muy sutiles |
| `--text` | `#11213d` | Texto principal |
| `--muted` | `#5f6b81` | Texto secundario |
| `--border` | `rgba(17,33,61,0.1)` | Bordes sutiles |
| `--accent` | `#1e50d8` | Color de acento primario |
| `--accent-strong` | `#1436a6` | Acento mas oscuro |
| `--accent-soft` | `rgba(30,80,216,0.12)` | Fondo de acento sutil |
| `--glow` | `rgba(117,79,255,0.28)` | Efecto de brillo |
| `--shadow` | `0 24px 80px rgba(14,25,47,0.12)` | Sombra principal |

### 9.2 Paleta de colores de estado

| Estado | Background | Texto |
|:---|:---|:---|
| Exito (matricula activa) | `#dcfce7` | `#166534` |
| Error | `#fef2f2` | `#b91c1c` |
| Warning (401) | `#fff7ed` | `#9a3412` |
| Info (409) | `#fefce8` | `#854d0e` |
| Egresado | `#dbeafe` | `#1e40af` |

### 9.3 Tipografia

**Fuente base:** AptosFallback (fallback: Segoe UI, Helvetica Neue, Trebuchet MS, sans-serif)

| Elemento | Font | Tamaño | Weight |
|:---|:---|:---|:---|
| Titulos hero | Georgia, Times New Roman, serif | `clamp(2.8rem, 6vw, 5.1rem)` | default |
| Titulos de seccion | Georgia, serif | `clamp(1.8rem, 4vw, 3rem)` | default |
| Body text | AptosFallback | `1.02rem` - `1.05rem` | 400 |
| Labels | AptosFallback | `0.85rem` - `0.9rem` | 700-800 |
| Botones | AptosFallback | `0.95rem` - `1rem` | 700-800 |

### 9.4 Breakpoints responsive

| Breakpoint | Media query |
|:---|:---|
| Tablet | `@media (max-width: 960px)` |
| Movil | `@media (max-width: 720px)` |

### 9.5 Border radius

| Elemento | Radio |
|:---|:---|
| Header | `22px` |
| Modal auth | `28px` |
| Botones | `999px` (pill), `14px` (normal) |
| Cards | `20px` - `24px` |
| Sections | `32px` |
| Inputs | `14px` |
| Badges | `999px` |

---

## 10. Modelo de Datos (Supabase)

### 10.1 Tablas principales

#### `usuarios`

| Columna | Tipo | Constraints | Descripcion |
|:---|:---|:---|:---|
| `id` | UUID | PK, default `gen_random_uuid()` | Identificador unico |
| `email` | VARCHAR | UNIQUE, NOT NULL | Correo electronico |
| `password_hash` | VARCHAR | NOT NULL | Hash de BCrypt (Supabase Auth) |
| `rol` | ENUM | NOT NULL, default `'estudiante'` | estudiante, docente, administrativo |
| `created_at` | TIMESTAMPTZ | DEFAULT `now()` | Fecha de creacion |

#### `estudiantes`

| Columna | Tipo | Constraints | Descripcion |
|:---|:---|:---|:---|
| `id` | UUID | PK, FK → usuarios.id | Relacion con usuario |
| `cedula_identidad` | VARCHAR | UNIQUE, NOT NULL | Cedula del estudiante |
| `primer_nombre` | VARCHAR | NOT NULL | Primer nombre |
| `segundo_nombre` | VARCHAR | — | Segundo nombre |
| `primer_apellido` | VARCHAR | NOT NULL | Primer apellido |
| `segundo_apellido` | VARCHAR | — | Segundo apellido |
| `telefono` | VARCHAR | — | Numero de telefono |
| `estado_matricula` | ENUM | DEFAULT `'activo'` | activo, suspendido, egresado |

#### `asignaturas`

| Columna | Tipo | Constraints | Descripcion |
|:---|:---|:---|:---|
| `id` | UUID | PK | Identificador unico |
| `codigo` | VARCHAR | UNIQUE, NOT NULL | Codigo de la materia (ej: MAT101) |
| `nombre` | VARCHAR | NOT NULL | Nombre de la materia |
| `descripcion` | TEXT | — | Descripcion de la materia |
| `creditos` | INTEGER | — | Creditos de la materia |

#### `secciones`

| Columna | Tipo | Constraints | Descripcion |
|:---|:---|:---|:---|
| `id` | UUID | PK | Identificador unico |
| `asignatura_id` | UUID | FK → asignaturas.id | Materia asociada |
| `docente_id` | UUID | FK → usuarios.id | Docente asignado |
| `periodo_id` | UUID | FK → periodos_lectivos.id | Periodo lectivo |
| `horario` | JSONB | — | Dias y horas (ej: `{"lunes": "08:00-10:00"}`) |
| `aula` | VARCHAR | — | Salon de clases |

#### `inscripciones`

| Columna | Tipo | Constraints | Descripcion |
|:---|:---|:---|:---|
| `id` | UUID | PK | Identificador unico |
| `estudiante_id` | UUID | FK → estudiantes.id | Estudiante inscrito |
| `seccion_id` | UUID | FK → secciones.id | Seccion inscrita |
| `nota_final` | DECIMAL | — | Calificacion final (0-20) |
| `inasistencias` | INTEGER | DEFAULT 0 | Numero de inasistencias |

#### `materiales` (Fase 2 — Biblioteca Digital)

| Columna | Tipo | Constraints | Descripcion |
|:---|:---|:---|:---|
| `id` | UUID | PK | Identificador unico |
| `seccion_id` | UUID | FK → secciones.id | Seccion asociada |
| `docente_id` | UUID | FK → usuarios.id | Docente que sube el material |
| `titulo` | VARCHAR | NOT NULL | Titulo del material |
| `unidad_tematica` | VARCHAR | — | Unidad del material |
| `tipo` | ENUM | NOT NULL | pdf, documento, enlace, video |
| `url_archivo` | TEXT | — | URL del archivo en Supabase Storage |
| `created_at` | TIMESTAMPTZ | DEFAULT `now()` | Fecha de subida |

### 10.2 Relaciones

```
usuarios ──1:1──> estudiantes
usuarios ──1:N──> secciones (como docente)
asignaturas ──1:N──> secciones
periodos_lectivos ──1:N──> secciones
estudiantes ──1:N──> inscripciones
secciones ──1:N──> inscripciones
secciones ──1:N──> materiales
usuarios ──1:N──> materiales (como docente)
```

### 10.3 Row Level Security (RLS)

| Politica | Tabla | Regla |
|:---|:---|:---|
| Estudiante ve su perfil | estudiantes | `auth.uid() = id` |
| Estudiante ve sus inscripciones | inscripciones | `auth.uid() = estudiante_id` |
| Estudiante ve materiales de sus secciones | materiales | `seccion_id IN (SELECT seccion_id FROM inscripciones WHERE estudiante_id = auth.uid())` |
| Docente sube material a sus secciones | materiales | `docente_id = auth.uid() AND seccion_id IN (SELECT id FROM secciones WHERE docente_id = auth.uid())` |
| Admin accede a todo | todas | `auth.uid() IN (SELECT id FROM usuarios WHERE rol = 'administrativo')` |

---

## 11. Endpoints del API (Planeados)

### 11.1 Autenticacion

| Metodo | Endpoint | Body | Response | Status |
|:---|:---|:---|:---|:---|
| POST | `/api/auth/register` | `{ email, password, cedula_identidad, primer_nombre, ... }` | `{ user, token }` | 201 |
| POST | `/api/auth/login` | `{ email, password }` | `{ user, token }` | 200 |

**Errores:**

| Status | Condicion | Body |
|:---|:---|:---|
| 401 | Credenciales invalidas | `{ error: "Credenciales invalidas" }` |
| 409 | Email o cedula duplicado | `{ error: "Este correo electronico o cedula ya se encuentra registrado." }` |
| 422 | Campos invalidos | `{ error: { campo: ["mensaje"] } }` |
| 500 | Error del servidor | `{ error: "Error del servidor" }` |

### 11.2 Dashboard

| Metodo | Endpoint | Headers | Response | Status |
|:---|:---|:---|:---|:---|
| GET | `/api/dashboard` | Authorization: Bearer {token} | `{ student: {...}, classes: [...] }` | 200 |

**Estructura de `student`:**
```json
{
  "id": "uuid",
  "cedula_identidad": "12345678",
  "primer_nombre": "Juan",
  "primer_apellido": "Perez",
  "email": "juan@email.com",
  "estado_matricula": "activo"
}
```

**Estructura de `classes`:**
```json
[
  {
    "codigo": "MAT101",
    "nombre": "Matematicas I",
    "profesor": "Ing. Carlos Perez",
    "horario": "Lun-Vie 8:00-10:00",
    "aula": "A-301"
  }
]
```

### 11.3 Biblioteca Digital (Fase 2)

| Metodo | Endpoint | Body/Params | Response | Status |
|:---|:---|:---|:---|:---|
| GET | `/api/materias/:seccionId/materiales` | — | `[ { material }, ... ]` | 200 |
| POST | `/api/materias/:seccionId/materiales` | FormData (archivo + metadata) | `{ material }` | 201 |
| DELETE | `/api/materiales/:id` | — | `{ message }` | 200 |

### 11.4 Variables de Entorno

| Variable | Descripcion | Ejemplo |
|:---|:---|:---|
| `VITE_API_BASE_URL` | URL base del backend | `http://localhost:3000` |
| `SUPABASE_URL` | URL del proyecto Supabase | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Anon key de Supabase | `eyJhbG...` |

---

## 12. Decisiones de Diseno

### 12.1 Patron de arquitectura

| Decision | Eleccion | Razon |
|:---|:---|:---|
| Arquitectura frontend | Feature-based (features/auth, features/dashboard) | Modularidad, escalabilidad, separacion de concerns |
| Estado global | Context API + useAuth() | Simplicidad, no se necesita Redux/Zustand para este tamano |
| Routing | React Router 7 con lazy loading | Code splitting, carga optimizada |
| Estilos | CSS vanilla con Custom Properties | Sin dependencias externas, control total |
| HTTP client | Wrapper sobre fetch() | Abstraccion de headers JWT y manejo de errores |

### 12.2 Convenciones de codigo

| Aspecto | Convencion |
|:---|:---|
| Nombres de archivos | PascalCase para componentes (`.jsx`), camelCase para servicios (`.js`) |
| Named exports | Siempre usar named exports (no default exports) |
| Barrel exports | Usar `index.js` en `/components` para simplificar imports |
| Alias de imports | `@/` apunta a `src/` (configurado en vite.config.js) |
| Comentarios | JSDoc en la primera linea de cada archivo |
| CSS | Clases CSS con BEM simplificado (`.auth-form`, `.sidebar-card`) |

### 12.3 Seguridad

| Aspecto | Implementacion |
|:---|:---|
| Passwords | Nunca se almacenan en texto plano (Supabase Auth usa BCrypt) |
| JWT | Se almacena en localStorage, se adjunta via header Authorization |
| RLS | Row Level Security en Supabase para datos criticos |
| CORS | Configurado en el backend para aceptar solo el frontend |
| Variables sensibles | `.env` en `.gitignore`, nunca en el repositorio |

---

## 13. Pipeline de Build

### 13.1 Scripts de package.json

| Script | Comando | Descripcion |
|:---|:---|:---|
| `dev` | `vite` | Inicia el dev server en puerto 5173 |
| `build` | `vite build` | Genera el build de produccion en `/dist` |
| `preview` | `vite preview` | Vista previa del build de produccion |
| `lint` | `eslint .` | Verifica errores de estilo del codigo |

### 13.2 Build de produccion

El build genera archivos estaticos en `/dist` listos para desplegar:

```
dist/
├── index.html
├── favicon.svg
├── hero-visual.svg
├── ITSU.webp
└── assets/
    ├── index-[hash].js      # Bundle principal
    ├── index-[hash].css     # Estilos
    └── vendor-[hash].js     # Dependencias (react, react-router)
```

### 13.3 Optimizaciones de Vite

| Optimizacion | Descripcion |
|:---|:---|
| Code splitting | Cada pagina se carga bajo demanda via React.lazy |
| Tree shaking | Elimina codigo no utilizado del bundle |
| Minificacion | JS y CSS minificados en produccion |
| Hash en filenames | Cache busting para actualizaciones seguras |
| Alias `@` | Resuelve imports desde `src/` sin paths relativos |

---

## 14. Dependencias

### 14.1 Dependencias de produccion

| Paquete | Version | Funcion |
|:---|:---|:---|
| `react` | 19.x | Libreria de UI |
| `react-dom` | 19.x | Renderer para browser |
| `react-router-dom` | 7.x | Enrutamiento SPA |

### 14.2 Dependencias de desarrollo

| Paquete | Version | Funcion |
|:---|:---|:---|
| `vite` | 8.x | Bundler y dev server |
| `@vitejs/plugin-react` | — | Plugin de React para Vite |
| `eslint` | — | Linter de JavaScript |
| `eslint-plugin-react-hooks` | — | Reglas de hooks para ESLint |
| `@eslint/js` | — | Reglas base de ESLint |

---

## 15. Guia de Extension (Fase 2)

### 15.1 Agregar una nueva ruta

1. Crear el componente lazy en `src/pages/NuevaPagina.jsx`
2. Agregar la ruta en `src/router/routes.jsx`
3. Si requiere auth: envolver con `<ProtectedRoute>`

### 15.2 Agregar un nuevo feature module

1. Crear carpeta `src/features/nuevo-modulo/`
2. Agregar subcarpetas `components/` y `services/`
3. Crear los servicios HTTP en `services/`
4. Crear los componentes en `components/`
5. Exportar desde un barrel `index.js` si es necesario

### 15.3 Conectar con Supabase

1. Instalar `@supabase/supabase-js`
2. Crear cliente Supabase en `src/services/supabase.js`
3. Configurar variables de entorno en `.env`
4. Reemplazar llamadas mock por llamadas reales al SDK
5. Configurar RLS en las tablas de Supabase

---

*Documento generado como parte de la planificacion del proyecto ITSU.*
