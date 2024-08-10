"use strict";
// config/swaggerOptions.ts
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Event Reservation API',
            version: '1.0.0',
            description: 'API documentation for the Event Reservation service',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
    },
    // Path to the API docs
    apis: ['./dist/controllers/*.js'],
};
exports.default = swaggerOptions;
