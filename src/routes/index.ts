import express = require("express");
import TruckRouter from "./TruckRouter";
import BeerRouter from './BeerRouter';

const router = express.Router();

router.use("/truck", TruckRouter);
router.use("/beer", BeerRouter);

export default router;
