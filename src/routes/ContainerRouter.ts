import { NextFunction, Request, Response, Router } from "express";
import { IBeerContainer } from "../model/";
import services from "../services";

class ContainerRouter {
  protected router: Router;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.init();
  }

  public async createContainer(req, res) {
    const container = await services.TruckService.createContainer(req.params.truckId, req.body.code, req.body.beerIds);
    res.send(container);
  }

  protected init() {
    this.router.put("/", this.createContainer);
  }
}

const containerRouter = new ContainerRouter();
containerRouter.init();

export default containerRouter.router;
