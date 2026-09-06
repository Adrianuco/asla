# Asla

Plataforma web diseñada para impulsar la comercialización e intercambio de productos elaborados por mujeres productoras rurales, indígenas y afrodescendientes de Nicaragua.

## Descripción

**Asla** es una plataforma web que busca fortalecer la economía local mediante la comercialización de productos elaborados por mujeres productoras rurales, indígenas y afrodescendientes. La aplicación facilita la publicación de productos, la gestión de pedidos y la coordinación de entregas, promoviendo una experiencia basada en tres pilares fundamentales: **simplicidad**, **comunidad** y **seguridad**.

La solución surge como respuesta a las barreras que enfrentan muchas productoras para acceder a nuevos mercados, reduciendo la dependencia de las ferias presenciales y ofreciendo un espacio digital accesible que fortalece las redes comunitarias y fomenta una comercialización más segura.

---

## Objetivo

Desarrollar una plataforma web que permita a las mujeres productoras divulgar sus productos de manera sencilla, fortalecer la colaboración entre comunidades y facilitar una gestión segura de los pedidos.

---

## Pilares del proyecto

### 🌱 Simplicidad

Diseño intuitivo orientado a usuarias con poca experiencia en herramientas digitales, priorizando una navegación clara y procesos sencillos.

### 🤝 Comunidad

Espacios que fortalecen la colaboración entre productoras mediante la creación de estas redes de comercio entre productoras y compradores

### 🛡️ Seguridad

Diseño del sistema orientado a la confianza entre productoras y compradores, contribuyendo a una experiencia de comercialización más segura.

---

## Requisitos funcionales

La plataforma ASLA permitirá a mujeres productoras y compradores interactuar mediante un sistema de comercialización digital de productos locales.

### Gestión de usuarios

- Registro e inicio de sesión de usuarios.
- Manejo de roles dentro de la plataforma.

### Gestión de productoras

- Registro y administración de información de productoras.
- Visualización de información de las productoras disponibles dentro de la plataforma.

### Gestión de productos

Las productoras podrán:

- Crear, editar y desactivar productos.
- Administrar información de sus productos.

Los compradores podrán:

- Explorar productos disponibles.
- Buscar productos por diferentes categorias.
- Consultar información de los productos y sus productoras.

### Carrito de compras

Los usuarios compradores podrán:

- Agregar productos a un carrito.
- Modificar cantidades de productos.
- Visualizar los productos agregados agrupados por productora.

### Gestión de pedidos

La plataforma permitirá:

- Generar pedidos a partir de los productos seleccionados en el carrito.
- Consultar el historial de pedidos realizados.

### Sistema de trueques

Los usuarios podrán:

- Crear propuestas de trueque.
- Gestionar productos involucrados en un intercambio.
- Consultar trueques realizados.

### Procesamiento de pagos

ASLA no implementará un sistema interno de procesamiento de pagos.

La plataforma facilitará la conexión entre compradores y productoras mediante la gestión de pedidos, pero la coordinación del pago y la entrega será realizada directamente entre ambas partes mediante canales externos, como comunicación por WhatsApp.

Esta decisión permite mantener el enfoque del proyecto en la comercialización, organización de pedidos y creación de redes entre productoras y compradores.

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
- HTML
- CSS

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
cd asla
```

### Backend

```bash
cd backend/Asla.Api
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
└── README.md
```

---
