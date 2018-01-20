import { IBeer } from "../model";
import { AbstractRepository } from ".";

export class BeerRepository extends AbstractRepository<IBeer> {
  constructor() {
    super("beer");
  }
}