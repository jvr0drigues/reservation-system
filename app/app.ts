import express from 'express';
import eventRoutes from './routes/event';
import seatRoutes from './routes/seat';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './config/swaggerOptions';

const app = express();

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/events', eventRoutes);
app.use('/seats', seatRoutes);

export default app;
