import { Router, Request, Response, NextFunction } from "express";
import { ITruck } from "../model/";
import services from '../services';
import { getErrorStatus } from '../Errors';
import containerRouter from './ContainerRouter';

class TruckRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    let truckList = await services.TruckService.list();
    res.send(truckList);
  }

  public async createTruck(req: Request, res: Response, next: NextFunction) {
    try {
      let truck = await services.TruckService.create({ driverName: req.body.driverName, containers: req.body.containers });
      res.send(truck);
    } catch (err) {
      let code = getErrorStatus(err);
      res.status(code).send({ code: code, message: err.message });
    }
  }

  init() {
    this.router.get("/", this.list);
    this.router.post("/", this.createTruck);
    this.router.use("/:truckId/container", containerRouter);
  }

}

const truckRoute = new TruckRouter();
truckRoute.init();

export default truckRoute.router;