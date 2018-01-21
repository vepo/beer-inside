import uuidv4 = require("uuid/v4");
import fs = require('fs');

import { ICollectionItem } from "../model";
function loadBeers() {
  return [{
    id: uuidv4(),
    maxTemperature: 6,
    minTemperature: 4,
    name: "Pilsner",
  }, {
    id: uuidv4(),
    maxTemperature: 7,
    minTemperature: 4,
    name: "Lager",
  }, {
    id: uuidv4(),
    maxTemperature: 6,
    minTemperature: 5,
    name: "IPA",
  }, {
    id: uuidv4(),
    maxTemperature: 8,
    minTemperature: 6,
    name: "Stout",
  }, {
    id: uuidv4(),
    maxTemperature: 6,
    minTemperature: 4,
    name: "Pale​ Ale",
  }, {
    id: uuidv4(),
    maxTemperature: 5,
    minTemperature: 3,
    name: "Wheat​ beer",
  }].reduce((acc, b) => { acc[b.id] = b; return acc; }, {});
}

function loadDatabase() {
  try {
    var content = fs.readFileSync("database.json", "UTF-8");
    if (!content) {
      return { beer: loadBeers() };
    } else {
      let jsonContent = JSON.parse(content);
      if (!jsonContent.beer) {
        jsonContent.beer = loadBeers();
      }
      return jsonContent;
    }
  } catch {
    return { beer: loadBeers() };
  }
}

const database = loadDatabase();

export class AbstractRepository<T extends ICollectionItem> {
  private collectionName: string;
  constructor(collectionName: string) {
    if (!database[collectionName]) {
      database[collectionName] = {};
    }
    this.collectionName = collectionName;
  }

  public async list(): Promise<T[]> {
    return new Promise((resolve) => {
      const databaseQuery: T[] = [];
      for (const id of Object.keys(database[this.collectionName])) {
        databaseQuery.push(database[this.collectionName][id]);
      }
      resolve(databaseQuery);
    }) as Promise<T[]>;
  }

  public async insert(obj: T): Promise<T> {
    return new Promise((resolve) => {
      if (!obj.id) {
        obj.id = uuidv4();
      }
      database[this.collectionName][obj.id] = obj;
      resolve(obj);
    }) as Promise<T>;
  }

  public async findById(id): Promise<T> {
    return new Promise((resolve, reject) => {
      const obj = database[this.collectionName][id];
      if (!obj) {
        reject(new Error("Not found!"));
      } else {
        resolve(obj);
      }
    }) as Promise<T>;
  }

  public async find(query): Promise<T[]> {
    return new Promise((resolve, reject) => {
      function filter(obj) {
        for (let key of Object.keys(query))
          if (query[key] && obj[key] != query[key]) {
            return false;
          }
        return true;
      }
      const collection = database[this.collectionName];
      if (!collection) {
        reject(new Error("Not collection found!"));
      } else {
        resolve(Object.keys(collection).map((id) => collection[id]).filter((obj) => filter(obj)));
      }
    }) as Promise<T[]>;
  }

  public async save() {
    return new Promise((resolve, reject) => {
      fs.writeFile("database.json", JSON.stringify(database, null, "\t"), { encoding: "UTF-8" }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export { BeerRepository } from "./BeerRepository";
export { ContainerRepository } from "./ContainerRepository";
export { TruckRepository } from "./TruckRepository";
