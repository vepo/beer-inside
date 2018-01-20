import { TruckRepository } from '../data'
import { ITruck, IBeerContainer, IBeer } from '../model';
import { ContainerRepository } from '../data/ContainerRepository';
import { BeerRepository } from '../data/BeerRepository';
import { Container, Beer } from './BeerService';

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

  async create(truck: ITruck): Promise<ITruck> {
    return this.truckRepository.insert(truck);
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

  async toContainer(dbContainer: IBeerContainer): Promise<Container> {
    let beers: IBeer[] = await Promise.all(dbContainer.beers.map(b => this.beerRepository.findById(b)));
    return new Container(
      dbContainer.id,
      dbContainer.code,
      dbContainer.truckId,
      beers.map(b => new Beer(b.id, b.name, b.minTemperature, b.maxTemperature)));
  }
}
