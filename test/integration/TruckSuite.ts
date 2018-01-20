import { suite, test, slow, timeout } from "mocha-typescript";
import * as assert from 'assert';
import app from '../helpers/App';
import http from '../helpers/Http';
import { ITruck, IBeer, IBeerContainer } from "../../src/model/index";
import uuidv4 = require('uuid/v4');

@suite("Truck")
class TruckSuite {

  static async before() {
    await app.start();
  }

  @test("Create a truck")
  async createTruckTest() {
    let list = await http.get<ITruck[]>('/api/truck');
    assert.equal(0, list.length);

    let truck = await http.post<ITruck>('/api/truck', {});
    assert.ok(truck.id);

    list = await http.get<ITruck[]>('/api/truck');
    assert.equal(1, list.length);
  }

  @test("Add beers to the truck")
  async addingBeersTest() {
    let truck = await http.post<ITruck>('/api/truck', {});
    let beers = await http.get<IBeer[]>('/api/beer');
    let container = await http.put<IBeerContainer>('/api/truck/' + truck.id + '/container', {
      code: uuidv4(),
      beerIds: beers.map(b => b.id)
    });
    console.log(container);
  }
}