import { BeerService as BeerServiceImpl } from "./BeerService";
import { TruckService as TruckServiceImpl } from "./TruckService";

export default {
  BeerService: new BeerServiceImpl(),
  TruckService: new TruckServiceImpl(),
};
