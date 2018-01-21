import express = require("express");

export abstract class AbstractRouter {
  protected router: express.Router;

  constructor() {
    this.router = express.Router({ mergeParams: true });
    this.init();
  }

  protected abstract init(): void;
}

import BeerRouter from "./BeerRouter";
import ContainerRouter from "./ContainerRouter";
import TruckRouter from "./TruckRouter";

const router = express.Router();

router.use("/truck", TruckRouter);
router.use("/beer", BeerRouter);
router.use("/container", ContainerRouter);

export default router;
