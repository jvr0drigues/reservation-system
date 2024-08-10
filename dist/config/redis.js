"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
const redisUrl = (_a = process.env.REDIS_URL) !== null && _a !== void 0 ? _a : 'redis://localhost:6379';
if (!redisUrl) {
    throw new Error('REDIS_URL environment variable is not set.');
}
const redisClient = (0, redis_1.createClient)({
    url: redisUrl
});
exports.redisClient = redisClient;
redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});
const connectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!redisClient.isOpen) {
            yield redisClient.connect();
            console.log('Successfully connected to Redis');
        }
    }
    catch (err) {
        console.error('Failed to connect to Redis', err);
    }
});
exports.connectRedis = connectRedis;
