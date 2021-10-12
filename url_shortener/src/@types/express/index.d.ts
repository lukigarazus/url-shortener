import { IUrl } from "@entities/Url";

declare module "express" {
  export interface Request {
    body: {
      url: string;
    };
  }

  export interface Response {
    body: {
      url: IUrl;
    };
  }
}
