import { Client } from "pg";

export const postgresClient = new Client({
  host: "0.0.0.0",
  user: "postgres",
  password: "postgres",
});
postgresClient.connect().catch((err) => {
  console.log("POSTGRES CONNECT ERROR");
});

export const getEntriesByHash = (hash: string) =>
  postgresClient.query<{ url: string }, string[]>(
    `SELECT id, url FROM urls WHERE hash=$1;`,
    [hash]
  );

export const insertEntry = (hashed: string, url: string) =>
  postgresClient.query(`INSERT INTO urls(hash, url) VALUES ($1, $2);`, [
    hashed,
    url,
  ]);
