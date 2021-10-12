import { Client } from "pg";

export const postgresClient = new Client({
  host: "0.0.0.0",
  user: "postgres",
  password: "postgres",
});
postgresClient.connect().catch((err) => {
  console.log("POSTGRES CONNECT ERROR");
});
