import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import validUrl from "valid-url";

import { hash } from "@shared/functions";
import { postgresClient } from "@shared/postgres";

const { BAD_REQUEST, CREATED, NOT_FOUND } = StatusCodes;

export async function addUrl(req: Request, res: Response) {
  const { url } = req.body;
  if (!url) {
    res.status(BAD_REQUEST).end();
  } else {
    const isValid = validUrl.isWebUri(url);
    if (isValid) {
      const hashed = await hash(url);
      res.status(CREATED).send({ result: hashed }).end();
      // no need to wait for this
      postgresClient.query(`INSERT INTO urls(hash, url) VALUES ($1, $2);`, [
        hashed,
        url,
      ]);
    } else {
      res.status(BAD_REQUEST).end();
    }
  }
}

export async function getShortened(req: Request, res: Response) {
  const pgRes = await postgresClient.query<{ url: string }, string[]>(
    `SELECT id, url FROM urls WHERE hash=$1;`,
    [req.params.hash]
  );
  if (pgRes.rows[0]?.url) res.redirect(pgRes.rows[0].url);
  else res.status(NOT_FOUND).end();
}
