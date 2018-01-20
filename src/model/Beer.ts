import { ICollectionItem } from ".";

export interface IBeer extends ICollectionItem {
  name: string;
  minTemperature: number;
  maxTemperature: number;
}

export interface IBeerContainer extends ICollectionItem {
  truckId: string;
  beers: string[];
  code: string;
}

export class Beer {
  constructor(public id: string,
              public name: string,
              public minTemperature: number,
              public maxTemperature: number) { }

  public toJson() {
    return {
      id: this.id,
      maxTemperature: this.maxTemperature,
      minTemperature: this.minTemperature,
      name: this.name,
    };
  }
}
