import { Router, Request, Response, NextFunction } from "express";
import { IBeerContainer } from "../model/";
import services from '../services';

class ContainerRouter {
  router: Router;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.init();
  }

  async createContainer(req, res) {
    let container = await services.TruckService.createContainer(req.params.truckId, req.body.code, req.body.beerIds);
    res.send(container);
  }

  init() {
    this.router.put("/", this.createContainer)
  }
}

const containerRouter = new ContainerRouter();
containerRouter.init();

export default containerRouter.router;