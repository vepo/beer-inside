import { Beer } from "./Beer";

export class Container {
  constructor(public id: string,
              public code: string,
              public currentTruckId: string,
              public beers: Beer[],
              public temperature?: number) { }

  get minTemperature() {
    return Math.max(...this.beers.map((b) => b.minTemperature));
  }

  get maxTemperature() {
    return Math.min(...this.beers.map((b) => b.maxTemperature));
  }

  public toJSON() {
    return {
      beers: this.beers,
      code: this.code,
      currentTruckId: this.currentTruckId,
      id: this.id,
      maxTemperature: this.maxTemperature,
      minTemperature: this.minTemperature,
      temperature: this.temperature,
    };
  }
}
