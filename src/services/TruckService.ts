import { AbstractService } from ".";
import { TruckRepository } from "../data";
import { BeerRepository } from "../data/BeerRepository";
import { ContainerRepository } from "../data/ContainerRepository";
import { ConflictError } from "../errors";
import { Beer, Container, IBeer, IBeerContainer, ITruck, Truck } from "../model";

export interface ICreateContainerParameter {
  code: string;
  beerIds: string[];
}

export interface ITruckCreateParameters {
  driverName: string;
  containers: ICreateContainerParameter[];
}

export class TruckService extends AbstractService {
  private truckRepository: TruckRepository;
  private containerRepository: ContainerRepository;

  constructor() {
    super();
    this.truckRepository = new TruckRepository();
    this.containerRepository = new ContainerRepository();
  }

  public async list() {
    const truckList = [];
    for (const iTruck of await this.truckRepository.list()) {
      truckList.push(this.toTruck(iTruck, await this.containerRepository.find({ truckId: iTruck.id })));
    }
    return await Promise.all(truckList);
  }

  public async find(id: string) {
    return this.toTruck(await this.truckRepository.findById(id), await this.containerRepository.find({ truckId: id }));
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
    await this.truckRepository.save();
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
    await this.truckRepository.save();
    return this.toContainer(container);
  }

  public async delete(truckId): Promise<Truck> {
    const truck = await this.truckRepository.remove(truckId);
    await this.truckRepository.save();
    const containers = await this.containerRepository.removeBy({ truckId });
    return this.toTruck(truck, containers);
  }

  private async checkBeerCompatibility(beerIds: string[]) {
    const beers = await Promise.all(beerIds.map((id) => this.beerRepository.findById(id)));
    if (Math.min(...beers.map((b) => b.maxTemperature)) < Math.max(...beers.map((b) => b.minTemperature))) {
      throw new ConflictError("Min temperature is greater than Max. Some beers are incompatible!");
    }
  }
}
