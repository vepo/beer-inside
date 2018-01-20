import uuidv4 = require('uuid/v4');

import { ICollectionItem } from '../model';
function loadBeers() {
  return [{
    id: uuidv4(),
    name: "Pilsner",
    minTemperature: 4,
    maxTemperature: 6
  }, {
    id: uuidv4(),
    name: "Lager",
    minTemperature: 4,
    maxTemperature: 7
  }, {
    id: uuidv4(),
    name: "IPA",
    minTemperature: 5,
    maxTemperature: 6
  }, {
    id: uuidv4(),
    name: "Stout",
    minTemperature: 6,
    maxTemperature: 8
  }, {
    id: uuidv4(),
    name: "Pale​ ​ Ale",
    minTemperature: 4,
    maxTemperature: 6
  }, {
    id: uuidv4(),
    name: "Wheat​ ​ beer",
    minTemperature: 3,
    maxTemperature: 5
  }].reduce((acc, b) => { acc[b.id] = b; return acc; }, {});
}

const database = { beer: loadBeers() };

export class AbstractRepository<T extends ICollectionItem>{
  private collectionName: string;
  constructor(collectionName: string) {
    if (!database[collectionName]) {
      database[collectionName] = {};
    }
    this.collectionName = collectionName;
  }

  async list(): Promise<T[]> {
    return <Promise<T[]>>new Promise(resolve => {
      let databaseQuery: T[] = [];
      for (let id of Object.keys(database[this.collectionName])) {
        databaseQuery.push(database[this.collectionName][id]);
      }
      resolve(databaseQuery);
    });
  }

  async insert(obj: T): Promise<T> {
    return <Promise<T>>new Promise(resolve => {
      if (!obj.id) {
        obj.id = uuidv4();
      }
      database[this.collectionName][obj.id] = obj;
      resolve(obj);
    });
  }

  async findById(id): Promise<T> {
    return <Promise<T>>new Promise((resolve, reject) => {
      let obj = database[this.collectionName][id];
      if (!obj) {
        console.log(this.collectionName, id, database);
        reject(new Error('Not found!'));
      } else {
        resolve(obj);
      }
    });
  }
}

export { BeerRepository } from './BeerRepository';
export { ContainerRepository } from './ContainerRepository';
export { TruckRepository } from './TruckRepository';
