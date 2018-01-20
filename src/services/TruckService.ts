import { TruckRepository } from '../data'
import { ITruck, IBeerContainer, IBeer } from '../model';
import { ContainerRepository } from '../data/ContainerRepository';
import { BeerRepository } from '../data/BeerRepository';
import { Container, Beer, Truck } from './BeerService';
import { ConflictError } from '../Errors';

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

  async list() {
    return this.truckRepository.list();
  }

  async create(truck: ITruckCreateParameters): Promise<ITruck> {
    for (let container of truck.containers) {
      let beers = await Promise.all(container.beerIds.map(id => this.beerRepository.findById(id)));
      if (Math.min(...beers.map(b => b.maxTemperature)) < Math.max(...beers.map(b => b.minTemperature))) {
        throw new ConflictError("Min temperature is greater than Max. Some beers are incompatible!");
      }
    }
    let dbTruck = await this.truckRepository.insert({
      id: null,
      driverName: truck.driverName
    });
    let dbContainers = await Promise.all(truck.containers
      .map(c => this.containerRepository.insert({ id: null, code: c.code, beers: c.beerIds, truckId: dbTruck.id })));
    return this.toTruck(dbTruck, dbContainers);
  }

  async createContainer(truckId, code, beerIds: string[]): Promise<Container> {
    let truck = await this.truckRepository.findById(truckId);
    let container = await this.containerRepository.insert({
      id: null,
      code: code,
      truckId: truckId,
      beers: beerIds
    });
    return this.toContainer(container);
  }

  async toTruck(dbTruck: ITruck, dbContainers: IBeerContainer[]): Promise<Truck> {
    return new Truck(dbTruck.id, dbTruck.driverName, await Promise.all(dbContainers.map(c => this.toContainer(c))));
  }

  async toContainer(dbContainer: IBeerContainer): Promise<Container> {
    let beers: IBeer[] = await Promise.all(dbContainer.beers.map(b => this.beerRepository.findById(b)));
    return new Container(
      dbContainer.id,
      dbContainer.code,
      dbContainer.truckId,
      beers.map(b => new Beer(b.id, b.name, b.minTemperature, b.maxTemperature)));
  }
}
