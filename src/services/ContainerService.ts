import { ContainerRepository } from "../data/ContainerRepository";
import { NotFoundError } from "../errors";
import { Container } from "../model";
import { AbstractService } from ".";


export class ContainerService extends AbstractService {
  private containerRepository: ContainerRepository;

  constructor() {
    super();
    this.containerRepository = new ContainerRepository();
  }

  public async find(truckId: string, code: string) {
    let container = await this.containerRepository.find({ truckId: truckId, code: code });
    if (!container || !container.length) {
      throw new NotFoundError(`Could not find Container: truck: ${truckId} code: ${code}`);
    }
    return await this.toContainer(container[0])
  }

  public async updateTemperature(truckId: string, code: string, temperature: number) {
    let container = await this.containerRepository.find({ truckId: truckId, code: code });
    if (!container || !container.length) {
      throw new NotFoundError(`Could not find Container: truck: ${truckId} code: ${code}`);
    }
    container[0].temperature = temperature;
    return await this.toContainer(container[0])
  }
}
