import { CHARACTERS, HASH_LENGTH, REDIS_HASHES } from "./constants";
import { exists, add } from "./redis";

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
  if (await exists(hashed)) return hashWithRandomString(_string);
  // no need to wait for this
  add(hashed);
  return hashed;
}

export const hash = hashWithRandomString;
