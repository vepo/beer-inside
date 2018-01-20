import express = require("express");
import BeerRouter from "./BeerRouter";
import TruckRouter from "./TruckRouter";

const router = express.Router();

router.use("/truck", TruckRouter);
router.use("/beer", BeerRouter);

export default router;
