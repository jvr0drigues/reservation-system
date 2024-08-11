# Reservation System

A service that supports a busy online reservation system using Node.js, Redis, and Docker. The service manages event seat reservations and includes features like creating events, listing available seats, holding seats, reserving seats, and refreshing holds.

## Table of Contents

- [Reservation System](#reservation-system)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Project Structure](#project-structure)

## Features

- Create events with a specified number of seats.
- List available seats for an event.
- Hold a seat for a user for a limited amount of time.
- Reserve a held seat for a user.
- Refresh the hold on a seat.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/jvr0drigues/reservation-system.git
    cd reservation-system
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    ```bash
    cp .env.example .env
    ```

4. Build the TypeScript code:
    ```bash
    npm run build
    ```

## Usage

1. Start the application:
    ```bash
    npm start
    ```

2. The application will run on `http://localhost:3000`.

## API Endpoints

- **Create Event**
  - **POST** `/events`
  - Request body: `{ "totalSeats": number }`
  - Response: `201 Created` with event data

- **List Available Seats**
  - **GET** `/events/:eventId/seats`
  - Response: `200 OK` with available seats data

- **Hold a Seat**
  - **POST** `/events/:eventId/seats/:seatId/hold`
  - Request body: `{ "userId": string }`
  - Response: `200 OK` with hold data

- **Reserve a Seat**
  - **POST** `/events/:eventId/seats/:seatId/reserve`
  - Request body: `{ "userId": string }`
  - Response: `200 OK` with reservation data

- **Refresh Hold**
  - **POST** `/events/:eventId/seats/:seatId/refresh`
  - Request body: `{ "userId": string }`
  - Response: `200 OK` with refresh hold data

## Project Structure

