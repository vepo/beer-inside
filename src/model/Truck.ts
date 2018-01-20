import { IBeerContainer } from "./Beer";
import { ICollectionItem } from ".";

export interface ITruck extends ICollectionItem {
  containers: IBeerContainer[];
}
