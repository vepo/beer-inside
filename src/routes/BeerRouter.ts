import { NextFunction, Request, Response, Router } from "express";
import { AbstractRouter } from ".";
import { IBeer } from "../model/";
import services from "../services";

class BeerRouter extends AbstractRouter {

  public async list(req: Request, res: Response, next: NextFunction) {
    const truckList = await services.BeerService.list();
    res.send(truckList);
  }

  public async createBeer(req: Request, res: Response, next: NextFunction) {
    const beer = await services.BeerService.create({
      id: null,
      maxTemperature: req.body.maxTemperature,
      minTemperature: req.body.minTemperature,
      name: req.body.name,
    });
    res.send(beer);
  }

  protected init() {
    this.router.get("/", this.list);
    this.router.post("/", this.createBeer);
  }

}

const beerRouter = new BeerRouter();
beerRouter.init();

export default beerRouter.router;
