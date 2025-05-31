# 📝 Task Manager App

Una aplicación moderna de gestión de tareas construida con Next.js 15, TypeScript, Drizzle ORM y PostgreSQL para Sidetool.

La version aplicación se encuentra en producción en el siguiente enlace:
https://sidetool-challenge.vercel.app/home

## ✨ Funcionalidades

- **Gestión de Tareas**: Crear, editar, eliminar y marcar tareas como completadas
- **Filtros**: Filtrar tareas por estado (completadas/incompletas)
- **Interfaz Moderna**: UI/UX moderno con TailwindCSS, Radix UI y Shadcn
- **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- **Base de Datos Robusta**: PostgreSQL con Drizzle ORM
- **API RESTful**: Backend con Hono.js
- **Testing**: Tests unitarios con Vitest y E2E con Playwright
- **TypeScript**: Tipado estático para mayor confiabilidad

## 🛠️ Stack Tecnológico

- **Frontend**: TypeScript, Next.js 15, React 19
- **Styling**: TailwindCSS, Radix UI, Lucide Icons
- **Backend**: Typescript, Hono.js, Drizzle ORM
- **Base de Datos**: PostgreSQL
- **Manejo de estado**: TanStack Query (React Query)
- **Validación**: Zod
- **Testing**: Vitest, Playwright

## 📁 Estructura del Proyecto

```
src/
├── app/                  # App Router de Next.js
│   ├── (tasks)/          # Grupo de rutas para tareas
│   ├── api/              # API routes (Hono intercepta los handlers)
│   └── globals.css       # Estilos globales
├── components/           # Componentes UI reutilizables
├── features/             # Features organizadas por dominio
│   └── tasks/            # Todo lo relacionado con tareas
├── db/                   # Configuración de base de datos
├── lib/                  # Utilidades y configuraciones
├── providers/            # Providers de contexto
├── schemas/              # Esquemas de validación Zod
└── utils/                # Funciones utilitarias
```

## 🚀 Configuración e Instalación

### Prerrequisitos

- Node.js 18+
- Docker
- Git

### 1. Clonar el Repositorio

```
git clone https://github.com/romoguill/sidetool-challenge.git
cd sidetool-challenge
```

### 2. Instalar Dependencias

```
npm install
```

### 3. Configurar Variables de Entorno

Crear el archivo `.env.development.local` en la raíz del proyecto:

```
# .env.development.local ejemplo

NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL="postgres://postgres:password@127.0.0.1:5432/db-sidetool-challenge"
POSTGRES_PASSWORD=password
POSTGRES_USER=postgres
POSTGRES_DB=db-sidetool-challenge
```

### 4. Levantar el Contenedor de PostgreSQL

```bash
# Iniciar el contenedor de PostgreSQL en segundo plano
docker-compose up -d

# Verificar que el contenedor esté funcionando
docker-compose ps
```

### 5. Configurar la Base de Datos

```bash
# Generar las migraciones de Drizzle
npm run db:generate

# Ejecutar las migraciones para crear las tablas
npm run db:migrate
```

### 6. Ejecutar la Aplicación en Modo Desarrollo

```bash
# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)
