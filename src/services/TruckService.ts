import { TruckRepository } from "../data";
import { BeerRepository } from "../data/BeerRepository";
import { ContainerRepository } from "../data/ContainerRepository";
import { ConflictError } from "../Errors";
import { Beer, Container, IBeer, IBeerContainer, ITruck, Truck } from "../model";

export interface ICreateContainerParameter {
  code: string;
  beerIds: string[];
}

export interface ITruckCreateParameters {
  driverName: string;
  containers: ICreateContainerParameter[];
}

export class TruckService {
  private truckRepository: TruckRepository;
  private beerRepository: BeerRepository;
  private containerRepository: ContainerRepository;

  constructor() {
    this.truckRepository = new TruckRepository();
    this.beerRepository = new BeerRepository();
    this.containerRepository = new ContainerRepository();
  }

  public async list() {
    return this.truckRepository.list();
  }

  public async create(truck: ITruckCreateParameters): Promise<ITruck> {
    for (const container of truck.containers) {
      await this.checkBeerCompatibility(container.beerIds);
    }
    const dbTruck = await this.truckRepository.insert({
      driverName: truck.driverName,
      id: null,
    });
    const dbContainers = await Promise.all(truck.containers
      .map((c) => this.containerRepository.insert({ id: null, code: c.code, beers: c.beerIds, truckId: dbTruck.id })));
    return this.toTruck(dbTruck, dbContainers);
  }

  public async createContainer(truckId, code, beerIds: string[]): Promise<Container> {
    await this.checkBeerCompatibility(beerIds);
    const truck = await this.truckRepository.findById(truckId);
    const container = await this.containerRepository.insert({
      beers: beerIds,
      code,
      id: null,
      truckId,
    });
    return this.toContainer(container);
  }

  private async checkBeerCompatibility(beerIds: string[]) {
    const beers = await Promise.all(beerIds.map((id) => this.beerRepository.findById(id)));
    if (Math.min(...beers.map((b) => b.maxTemperature)) < Math.max(...beers.map((b) => b.minTemperature))) {
      throw new ConflictError("Min temperature is greater than Max. Some beers are incompatible!");
    }
  }

  private async toTruck(dbTruck: ITruck, dbContainers: IBeerContainer[]): Promise<Truck> {
    return new Truck(dbTruck.id, dbTruck.driverName, await Promise.all(dbContainers.map((c) => this.toContainer(c))));
  }

  private async toContainer(dbContainer: IBeerContainer): Promise<Container> {
    const beers: IBeer[] = await Promise.all(dbContainer.beers.map((b) => this.beerRepository.findById(b)));
    return new Container(
      dbContainer.id,
      dbContainer.code,
      dbContainer.truckId,
      beers.map((b) => new Beer(b.id, b.name, b.minTemperature, b.maxTemperature)));
  }
}
