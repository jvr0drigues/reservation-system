import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL ?? 'redis://localhost:6379';

if (!redisUrl) {
  throw new Error('REDIS_URL environment variable is not set.');
}

const redisClient = createClient({
  url: redisUrl
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('Successfully connected to Redis');
    }
  } catch (err) {
    console.error('Failed to connect to Redis', err);
  }
};

export { redisClient, connectRedis };
