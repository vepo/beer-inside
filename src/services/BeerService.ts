import { BeerRepository } from "../data";
import { Container, IBeer } from "../model";

export class BeerService {
  private beerRepository: BeerRepository;

  constructor() {
    this.beerRepository = new BeerRepository();
  }

  public async list() {
    return this.beerRepository.list();
  }

  public async create(beer: IBeer): Promise<IBeer> {
    return this.beerRepository.insert(beer);
  }
}
