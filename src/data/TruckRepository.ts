import { AbstractRepository } from ".";
import { ITruck } from "../model";

export class TruckRepository extends AbstractRepository<ITruck> {
  constructor() {
    super("truck");
  }
}
