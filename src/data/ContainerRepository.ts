import { IBeerContainer } from "../model";
import { AbstractRepository } from ".";

export class ContainerRepository extends AbstractRepository<IBeerContainer> {
  constructor() {
    super("beer-container");
  }
}