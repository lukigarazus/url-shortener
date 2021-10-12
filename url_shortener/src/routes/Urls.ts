import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import validUrl from "valid-url";

import { hash } from "@shared/functions";
import { getEntriesByHash, insertEntry } from "@shared/postgres";

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
      insertEntry(hashed, url);
    } else {
      res.status(BAD_REQUEST).end();
    }
  }
}

export async function getShortened(req: Request, res: Response) {
  const pgRes = await getEntriesByHash(req.params.hash);
  if (pgRes.rows[0]?.url) res.redirect(pgRes.rows[0].url);
  else res.status(NOT_FOUND).end();
}
