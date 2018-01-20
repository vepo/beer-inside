import { ITruck } from "../model";
import { AbstractRepository } from ".";

export class TruckRepository extends AbstractRepository<ITruck> {
  constructor() {
    super("truck");
  }
}