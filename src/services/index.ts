import { BeerRepository } from "../data/BeerRepository";
import { Beer, Container, IBeer, IBeerContainer, ITruck, Truck } from "../model";

export class AbstractService {
  protected beerRepository: BeerRepository;

  constructor() {
    this.beerRepository = new BeerRepository();
  }

  protected async toTruck(dbTruck: ITruck, dbContainers: IBeerContainer[]): Promise<Truck> {
    return new Truck(dbTruck.id, dbTruck.driverName, await Promise.all(dbContainers.map((c) => this.toContainer(c))));
  }

  protected async toContainer(dbContainer: IBeerContainer): Promise<Container> {
    const beers: IBeer[] = await Promise.all(dbContainer.beers.map((b) => this.beerRepository.findById(b)));
    return new Container(dbContainer.id,
                         dbContainer.code,
                         dbContainer.truckId,
                         beers.map((b) => new Beer(b.id, b.name, b.minTemperature, b.maxTemperature)),
                         dbContainer.temperature);
  }
}

import { BeerService as BeerServiceImpl } from "./BeerService";
import { ContainerService as ContainerServiceImpl } from "./ContainerService";
import { TruckService as TruckServiceImpl } from "./TruckService";

export default {
  BeerService: new BeerServiceImpl(),
  ContainerService: new ContainerServiceImpl(),
  TruckService: new TruckServiceImpl(),
};
