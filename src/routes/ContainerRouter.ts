import { NextFunction, Request, Response, Router } from "express";
import { IBeerContainer } from "../model/";
import services from "../services";
import { getErrorStatus } from "../errors";

class ContainerRouter {
  protected router: Router;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.init();
  }

  public async createContainer(req: Request, res: Response) {
    if (!req.params.truckId) {
      res.status(400).send({ code: 400, message: 'BadRequest: use /api/truck/<truck id>/container to add a container' });
    } else {
      const container = await services.TruckService.createContainer(req.params.truckId, req.body.code, req.body.beerIds);
      res.send(container);
    }
  }

  public async updateTemperature(req: Request, res: Response) {
    try {
      const container = await services.ContainerService.updateTemperature(req.params.truckId, req.params.containerId, req.body.temperature);
      res.send(container);
    } catch (err) {
      const code = getErrorStatus(err);
      res.status(code).send({ code, message: err.message });
    }
  }

  public async getInfo(req: Request, res: Response) {
    try {
      const container = await services.ContainerService.find(req.params.truckId, req.params.containerId);
      res.send(container);
    } catch (err) {
      const code = getErrorStatus(err);
      res.status(code).send({ code, message: err.message });
    }
  }

  protected init() {
    this.router.put("/", this.createContainer);
    this.router.get("/:containerId", this.getInfo);
    this.router.put("/:containerId", this.updateTemperature);
  }
}

const containerRouter = new ContainerRouter();
containerRouter.init();

export default containerRouter.router;
