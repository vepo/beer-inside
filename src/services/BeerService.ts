import { BeerRepository } from "../data";
import { Container, IBeer } from "../model";
import { AbstractService } from "./index";

export class BeerService extends AbstractService {

  constructor() {
    super()
  }

  public async list() {
    return this.beerRepository.list();
  }

  public async create(beer: IBeer): Promise<IBeer> {
    return this.beerRepository.insert(beer);
  }
}
