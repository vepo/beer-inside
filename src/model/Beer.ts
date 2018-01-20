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