# Asla

Plataforma web diseñada para impulsar la comercialización de productos elaborados por mujeres productoras rurales, indígenas y afrodescendientes de Nicaragua.

## Descripción

**Asla** es una plataforma web que busca fortalecer la economía local mediante la comercialización de productos elaborados por mujeres productoras rurales, indígenas y afrodescendientes. La aplicación facilita la publicación de productos, la gestión de pedidos y la coordinación de entregas, promoviendo una experiencia basada en tres pilares fundamentales: **simplicidad**, **comunidad** y **seguridad**.

La solución surge como respuesta a las barreras que enfrentan muchas productoras para acceder a nuevos mercados, reduciendo la dependencia de las ferias presenciales y ofreciendo un espacio digital accesible que fortalece las redes comunitarias y fomenta una comercialización más segura.

---

## Objetivo

Desarrollar una plataforma web que permita a las mujeres productoras comercializar sus productos de manera sencilla, fortalecer la colaboración entre comunidades y facilitar una gestión segura de los pedidos y las entregas.

---

## Pilares del proyecto

### 🌱 Simplicidad

Diseño intuitivo orientado a usuarias con poca experiencia en herramientas digitales, priorizando una navegación clara y procesos sencillos.

### 🤝 Comunidad

Espacios que fortalecen la colaboración entre productoras mediante la organización comunitaria y la creación de redes de apoyo.

### 🛡️ Seguridad

Diseño del sistema orientado a la confianza entre productoras y compradores, contribuyendo a una experiencia de comercialización más segura.

---

## Arquitectura

El proyecto sigue una arquitectura cliente-servidor compuesta por un frontend, una API REST y una base de datos relacional.

```text
┌──────────────┐
│   Frontend   │
│    React     │
└──────┬───────┘
       │ HTTP
       ▼
┌──────────────┐
│ ASP.NET Core │
│   Web API    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ SQL Server   │
└──────────────┘
```

---

## 🛠️ Tecnologías

### Frontend

- React
- JavaScript
- Vite
- HTML5
- CSS3

### Backend

- ASP.NET Core Web API
- C#
- Entity Framework

### Base de Datos

- SQL Server

### Herramientas

- Git
- GitHub
- Docker
- Visual Studio
- Visual Studio Code
- Figma

---

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/Adrianuco/asla.git
```

### Backend

```bash
cd backend
dotnet restore
dotnet run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Estructura del proyecto

```text
app/
│
├── frontend/
│
├── backend/
│
├── database/
│
├── docs/
│
└── README.md
```

---
