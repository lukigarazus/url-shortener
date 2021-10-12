import { CHARACTERS, HASH_LENGTH, REDIS_HASHES } from "./constants";
import { redisClient } from "./redis";

function makeid(length: number) {
  var result = "";
  var characters = CHARACTERS;
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomString() {
  return makeid(HASH_LENGTH);
}

async function hashWithRandomString(_string: string): Promise<string> {
  const hashed = await randomString();
  if (await redisClient.exists(REDIS_HASHES, hashed))
    return hashWithRandomString(_string);
  // no need to wait for this
  redisClient.add(REDIS_HASHES, hashed);
  return hashed;
}

export const hash = hashWithRandomString;
