import { Router, Request, Response, NextFunction } from "express";
import { IBeer } from "../model/";
import services from '../services';

class BeerRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    let truckList = await services.BeerService.list();
    res.send(truckList);
  }

  public async createBeer(req: Request, res: Response, next: NextFunction) {
    let beer = await services.BeerService.create({
      id: null,
      name: req.body.name,
      maxTemperature: req.body.maxTemperature,
      minTemperature: req.body.minTemperature
    });
    res.send(beer);
  }

  init() {
    this.router.get("/", this.list);
    this.router.post("/", this.createBeer);
  }

}

const beerRouter = new BeerRouter();
beerRouter.init();

export default beerRouter.router;