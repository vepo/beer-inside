import { TruckService as TruckServiceImpl } from "./TruckService";
import { BeerService as BeerServiceImpl } from './BeerService';
export default {
  BeerService: new BeerServiceImpl(),
  TruckService: new TruckServiceImpl()
}
