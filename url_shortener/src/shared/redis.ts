import { RedisBloom } from "redis-modules-sdk";
import { REDIS_HASHES, CHARACTERS, HASH_LENGTH } from "./constants";

export const redisClient = new RedisBloom({ host: "localhost", port: 6379 });

redisClient.connect().then(() => {
  redisClient.reserve(
    REDIS_HASHES,
    0.001,
    Math.pow(CHARACTERS.length, HASH_LENGTH)
  );
});

export const exists = (hashed: string) =>
  redisClient.exists(REDIS_HASHES, hashed);

export const add = (hashed: string) => redisClient.add(REDIS_HASHES, hashed);
