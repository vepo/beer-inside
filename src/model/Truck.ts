import { ICollectionItem } from ".";
import { IBeerContainer } from "./Beer";
import { Container } from "./Container";

export interface ITruck extends ICollectionItem {
  driverName: string;
}

export class Truck {
  constructor(public id: string,
              public driverName: string,
              public containers: Container[]) { }
}
