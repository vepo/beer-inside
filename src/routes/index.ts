import express = require("express");
import BeerRouter from "./BeerRouter";
import ContainerRouter from "./ContainerRouter";
import TruckRouter from "./TruckRouter";

const router = express.Router();

router.use("/truck", TruckRouter);
router.use("/beer", BeerRouter);
router.use("/container", ContainerRouter);

export default router;
