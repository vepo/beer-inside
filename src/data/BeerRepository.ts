import { AbstractRepository } from ".";
import { IBeer } from "../model";

export class BeerRepository extends AbstractRepository<IBeer> {
  constructor() {
    super("beer");
  }
}
