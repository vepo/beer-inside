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

  @test("List trucks")
  async createTruckTest() {
    let list = await http.get<ITruck[]>('/api/truck');
    assert.equal(0, list.length);
  }

  @test("Create a truck")
  async addingBeersTest() {
    let beers = await http.get<IBeer[]>('/api/beer');
    let container = await http.post<IBeerContainer>('/api/truck', {
      containers: [
        {
          beerIds: [beers[0].id],
          code: uuidv4()
        }
      ],
      driverName: "Jonh Doe"
    });
    assert.ok(container);
  }

  @test("Validate Container temperature")
  async validateContainerTemperatureTest() {
    try {
      let beers = await http.get<IBeer[]>('/api/beer');
      let container = await http.post<IBeerContainer>('/api/truck', {
        containers: [
          {
            beerIds: beers.map(b => b.id),
            code: uuidv4()
          }
        ],
        driverName: "Jonh Doe"
      });
      assert.fail('It should throw an error!');
    } catch (err) {
      assert.equal(409, err.code, 'It should return conflict!');
    }
  }
}