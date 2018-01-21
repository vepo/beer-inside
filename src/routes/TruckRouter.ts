import { NextFunction, Request, Response, Router } from "express";
import { AbstractRouter } from ".";
import { BadRequestError, ConflictError, getErrorStatus } from "../errors";
import { ITruck } from "../model/";
import services from "../services";
import containerRouter from "./ContainerRouter";

class TruckRouter extends AbstractRouter {

  private static async checkContainersInUse(containerCodes: string[]) {
    for (const code of containerCodes) {
      const container = await services.ContainerService.find(null, code, true);
      if (container) {
        throw new ConflictError(`Container in use: ${code}`);
      }
    }
  }

  public async list(req: Request, res: Response) {
    const truckList = await services.TruckService.list();
    res.send(truckList);
  }

  public async createTruck(req: Request, res: Response) {
    try {
      if (!req.body.containers || req.body.containers.length === 0) {
        throw new BadRequestError("A truck need at least a container!");
      }
      if (req.body.containers.filter((c) => c.code).length === 0) {
        throw new BadRequestError("All container must have unique a code!");
      }
      await TruckRouter.checkContainersInUse(req.body.containers.map((c) => c.code));
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

  public async remove(req: Request, res: Response) {
    try {
      res.send(await services.TruckService.delete(req.params.truckId));
    } catch (err) {
      const code = getErrorStatus(err);
      res.status(code).send({ code, message: err.message });
    }
  }

  protected init() {
    this.router.get("/", this.list);
    this.router.post("/", this.createTruck);
    this.router.get("/:truckId", this.get);
    this.router.delete("/:truckId", this.remove);
    this.router.use("/:truckId/container", containerRouter);
  }
}

const truckRoute = new TruckRouter();
truckRoute.init();

export default truckRoute.router;
