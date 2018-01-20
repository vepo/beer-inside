import { NextFunction, Request, Response, Router } from "express";
import { getErrorStatus } from "../errors";
import { ITruck } from "../model/";
import services from "../services";
import containerRouter from "./ContainerRouter";

class TruckRouter {
  protected router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public async list(req: Request, res: Response) {
    const truckList = await services.TruckService.list();
    res.send(truckList);
  }

  public async createTruck(req: Request, res: Response) {
    try {
      const truck = await services.TruckService.create({
        containers: req.body.containers,
        driverName: req.body.driverName,
      });
      res.send(truck);
    } catch (err) {
      const code = getErrorStatus(err);
      res.status(code).send({ code, message: err.message });
    }
  }

  public async get(req: Request, res: Response) {
    try {
      res.send(await services.TruckService.find(req.params.truckId));
    } catch (err) {
      const code = getErrorStatus(err);
      res.status(code).send({ code, message: err.message });
    }
  }

  protected init() {
    this.router.get("/", this.list);
    this.router.post("/", this.createTruck);
    this.router.get("/:truckId", this.get);
    this.router.use("/:truckId/container", containerRouter);
  }

}

const truckRoute = new TruckRouter();
truckRoute.init();

export default truckRoute.router;
