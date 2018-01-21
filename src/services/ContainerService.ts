import { AbstractService } from ".";
import { ContainerRepository } from "../data/ContainerRepository";
import { NotFoundError } from "../errors";
import { Container } from "../model";

export class ContainerService extends AbstractService {
  private containerRepository: ContainerRepository;

  constructor() {
    super();
    this.containerRepository = new ContainerRepository();
  }

  public async findAll(truckId?: string) {
    const containers = await this.containerRepository.find({ truckId });
    return await Promise.all(containers.map((c) => this.toContainer(c)));
  }

  public async find(truckId: string, code: string, silent = false) {
    const container = await this.containerRepository.find({ truckId, code });
    if (!container || !container.length) {
      if (silent) {
        return null;
      } else {
        throw new NotFoundError(`Could not find Container: truck: ${truckId} code: ${code}`);
      }
    }
    return await this.toContainer(container[0]);
  }

  public async updateTemperature(truckId: string, code: string, temperature: number) {
    const container = await this.containerRepository.find({ truckId, code });
    if (!container || !container.length) {
      throw new NotFoundError(`Could not find Container: truck: ${truckId} code: ${code}`);
    }
    container[0].temperature = temperature;
    await this.containerRepository.save();
    return await this.toContainer(container[0]);
  }
}
