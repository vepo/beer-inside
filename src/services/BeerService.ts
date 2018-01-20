import { BeerRepository } from '../data'
import { IBeer } from '../model';

export class Beer {
  constructor(public id: string,
    public name: string,
    public minTemperature: number,
    public maxTemperature: number) { }
}

export class Container {
  constructor(
    public id: string,
    public code: string,
    public currentTruckId: string,
    public beers: Beer[]) { }

  get minTemperature() {
    return Math.max(...this.beers.map(b => b.minTemperature));
  }

  get maxTemperature() {
    return Math.min(...this.beers.map(b => b.maxTemperature));
  }

  toJSON() {
    return {
      id: this.id,
      code: this.code,
      currentTruckId: this.currentTruckId,
      minTemperature: this.minTemperature,
      maxTemperature: this.maxTemperature,
      beers: this.beers
    }
  }
}

export class BeerService {
  private beerRepository: BeerRepository;

  constructor() {
    this.beerRepository = new BeerRepository();
  }

  async list() {
    return this.beerRepository.list();
  }

  async create(beer: IBeer): Promise<IBeer> {
    return this.beerRepository.insert(beer);
  }
}
