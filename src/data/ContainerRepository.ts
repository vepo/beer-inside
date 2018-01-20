import { AbstractRepository } from ".";
import { IBeerContainer } from "../model";

export class ContainerRepository extends AbstractRepository<IBeerContainer> {
  constructor() {
    super("beer-container");
  }
}
