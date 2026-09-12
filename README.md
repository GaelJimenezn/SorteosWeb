# SorteosWeb

> **English / Español**

## Overview

SorteosWeb is a web application prototype designed around the management of university raffles. The project was developed as a potential commercial proposal, but it remained a prototype and was never delivered to a client or deployed as a production system.

The main goal was to model the complete user flow around raffle tickets: browsing active raffles, selecting a ticket, reserving it, and providing an administrative interface for payment validation and winner selection.

This repository focuses on frontend implementation and interaction flows. Data persistence and backend integration were intentionally left as future work.

## Project Focus

- Raffle catalog and landing page.
- Interactive ticket selection.
- Manual or random ticket selection.
- Ticket reservation flow.
- Simulated participant authentication.
- Administrative ticket validation.
- Roulette-style winner selection.
- Component-based organization using Vanilla JavaScript.

## Features

### Public flow

- Landing page with active raffles.
- Raffle cards with prize and ticket information.
- Ticket selection through an interactive grid.
- Visual distinction between available and unavailable tickets.
- Random ticket generation.
- Reservation form for participant information.
- WhatsApp redirection after reservation.
- FAQ and contact sections.

### Administrative flow

- Separate administrative page.
- List of tickets with activity.
- Payment validation for tickets in the review state.
- Filtering confirmed tickets for the draw.
- Interactive roulette animation for selecting a winner.

## Technical Implementation

The project uses **Vanilla JavaScript** and a lightweight custom SPA structure instead of a frontend framework.

### Component-based frontend

The interface is divided into reusable JavaScript modules for elements such as:

- `Navbar`
- `Footer`
- `RaffleCard`
- `BuyOverlay`
- `TicketGrid`
- `TicketModal`
- `AuthModal`
- `FAQSection`
- `HeroSlider`

This organization separates UI responsibilities while keeping the application relatively lightweight.

### Client-side state simulation

For the prototype, raffle and ticket information is represented in JavaScript. The project simulates ticket states such as:

`disponible` → `proceso` → `confirmado`

Reservation and payment-validation functions update this in-memory state so the complete interaction flow can be demonstrated without a backend.

### Routing

A small custom router handles the main frontend routes and renders pages dynamically without depending on a framework router.

### Administrative roulette

The admin interface retrieves confirmed tickets and uses JavaScript's random selection to drive a roulette-style visual animation. The final selected participant is displayed as the winner.

## Project Structure

```text
SorteosWeb/
├── frontend/
│   ├── admin.html
│   ├── index.html
│   ├── src/
│   │   ├── admin/
│   │   │   ├── dashboard.js
│   │   │   ├── main.js
│   │   │   └── roulette.js
│   │   ├── front/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── main.js
│   │   │   └── router.js
│   │   └── services/
│   │       └── data.js
│   └── styles/
│       ├── components.css
│       ├── main.css
│       └── variables.css
└── README.md
```

## Technologies

- HTML5
- CSS3
- JavaScript (ES Modules)
- Vanilla JavaScript
- Browser APIs such as `localStorage`

## Running the Project

The project is a static frontend prototype and does not require a backend to demonstrate its current functionality.

1. Clone the repository.
2. Open the `frontend` directory with a local development server.
3. Open `index.html` through that server.
4. Use the public interface to explore the raffle and ticket flows.
5. Open `admin.html` to explore the administrative interface.

A local server is recommended because the project uses JavaScript modules.

## Current Status

**Prototype / Practice Project**

The current repository demonstrates the frontend experience and business flow, but it is not a production-ready raffle platform.

Current limitations include:

- No backend or persistent database.
- Ticket data is stored in memory for demonstration purposes.
- Authentication is simulated on the client side.
- Payment processing is not implemented.
- WhatsApp is used as an external contact step rather than an automated payment workflow.
- The winner selection logic is a frontend simulation.

## Development Context

The project originated as a potential commercial web proposal. It was developed far enough to demonstrate the intended user and administrator experience, but the commercial engagement was not completed. No client delivery or production deployment took place.

Because of this, the repository is presented as a **prototype built for a real-world use case**, rather than as a completed client project.

## Future Improvements

If developed further, the next technical steps would include:

- Backend API for raffle and ticket management.
- Persistent database storage.
- Proper authentication and authorization.
- Server-side reservation and ticket-state validation.
- Payment verification workflow.
- Persistent draw records and winner history.
- Production deployment and security hardening.

---

# Español

## Descripción

SorteosWeb es un prototipo de aplicación web diseñado para la gestión de sorteos universitarios. El proyecto se desarrolló como una posible propuesta comercial, pero quedó como prototipo y **no fue entregado a un cliente ni desplegado como sistema de producción**.

La idea fue modelar el flujo completo alrededor de los boletos: consultar sorteos, seleccionar un número, apartarlo y proporcionar un panel administrativo para validar pagos y realizar el sorteo de un ganador.

El repositorio se enfoca principalmente en la implementación frontend y en los flujos de interacción. La persistencia de datos y la integración con backend quedaron como trabajo futuro.

## Funcionalidades

- Catálogo de sorteos.
- Selección interactiva de boletos.
- Selección manual o aleatoria.
- Reserva de boletos.
- Autenticación simulada.
- Panel administrativo.
- Validación de boletos.
- Ruleta visual para seleccionar ganadores.
- Organización modular mediante Vanilla JavaScript.
- Redirección a WhatsApp después de una reserva.

## Estado del proyecto

**Prototipo / Proyecto de práctica**

Los datos de los boletos se simulan en memoria y no existe actualmente un backend o una base de datos persistente. Tampoco se implementó procesamiento de pagos ni autenticación real.

El proyecto representa una propuesta funcional de frontend para un caso de uso comercial real, pero no debe considerarse una plataforma de sorteos lista para producción.

## Contexto

El proyecto nació como una propuesta que potencialmente se iba a realizar para un tercero. El desarrollo se quedó en etapa de prototipo y no llegó a concretarse la entrega comercial.

Por ello, se presenta como un **prototipo desarrollado para un caso de uso real**, sin atribuirle una implementación o despliegue que no ocurrió.

## Próximos pasos

Una versión de producción requeriría, entre otras cosas:

- API y backend.
- Base de datos persistente.
- Autenticación y autorización reales.
- Validaciones del lado del servidor.
- Flujo de pagos.
- Historial persistente de sorteos y ganadores.
- Endurecimiento de seguridad y despliegue de producción.
