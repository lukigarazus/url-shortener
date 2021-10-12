import { Router } from "express";
import { addUrl, getShortened } from "./Urls";

// User-route
const urlRouter = Router();
urlRouter.post("/add", addUrl);

// API route
const apiRouter = Router();
apiRouter.use("/url", urlRouter);

// Redirect route
const redirectRouter = Router();
redirectRouter.get("/:hash", getShortened);

// Export the base-router
const baseRouter = Router();
baseRouter.use("/api", apiRouter);
baseRouter.use("/shrt", redirectRouter);
export default baseRouter;
