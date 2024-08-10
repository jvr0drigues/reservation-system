import 'dotenv/config';
import app from './app';
import { redisClient, connectRedis } from './config/redis';

const port = process.env.PORT ?? 3000;

const startServer = async () => {
  await connectRedis();

  app.locals.redis = redisClient;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
