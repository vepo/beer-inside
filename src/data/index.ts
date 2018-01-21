import fs = require("fs");
import uuidv4 = require("uuid/v4");

import { NotFoundError } from "../errors";
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
  /* istanbul ignore next */
  try {
    const content = fs.readFileSync("database.json", "UTF-8");
    if (!content) {
      return { beer: loadBeers() };
    } else {
      const jsonContent = JSON.parse(content);
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
    /* istanbul ignore next */
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

  public async clear(): Promise<void> {
    return new Promise((resolve) => {
      if (this.collectionName === "beer") {
        database[this.collectionName] = loadBeers();
      } else {
        database[this.collectionName] = {};
      }
      resolve();
    }) as Promise<void>;
  }

  public async insert(obj: T): Promise<T> {
    return new Promise((resolve) => {
      /* istanbul ignore next */
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
      /* istanbul ignore next */
      if (!obj) {
        reject(new NotFoundError("Not found!"));
      } else {
        resolve(obj);
      }
    }) as Promise<T>;
  }

  public async find(query): Promise<T[]> {
    return new Promise((resolve, reject) => {
      function filter(obj) {
        for (const key of Object.keys(query)) {
          if (query[key] && obj[key] !== query[key]) {
            return false;
          }
        }
        return true;
      }
      const collection = database[this.collectionName];

      /* istanbul ignore next */
      if (!collection) {
        reject(new NotFoundError("Not collection found!"));
      } else {
        resolve(Object.keys(collection).map((id) => collection[id]).filter((obj) => filter(obj)));
      }
    }) as Promise<T[]>;
  }

  public async remove(id): Promise<T> {
    return new Promise((resolve, reject) => {
      const obj = database[this.collectionName][id];
      /* istanbul ignore next */
      if (obj) {
        delete database[this.collectionName][id];
      }
      resolve(obj);
    }) as Promise<T>;
  }

  public async removeBy(query): Promise<T[]> {
    return new Promise((resolve, reject) => {
      function filter(obj) {
        for (const key of Object.keys(query)) {
          if (query[key] && obj[key] !== query[key]) {
            return false;
          }
        }
        return true;
      }
      const collection = database[this.collectionName];
      const removedData = [];
      /* istanbul ignore next */
      if (collection) {
        for (const id of Object.keys(collection)) {
          if (filter(collection[id])) {
            removedData.push(collection[id]);
            delete collection[id];
          }
        }
      }
      resolve(removedData);
    }) as Promise<T[]>;
  }

  public async save() {
    return new Promise((resolve, reject) => {
      fs.writeFile("database.json", JSON.stringify(database, null, "\t"), { encoding: "UTF-8" }, (err) => {
        /* istanbul ignore next */
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
