import { suite, test, slow, timeout } from "mocha-typescript";
import * as assert from 'assert';
import app from '../helpers/App';
import http from '../helpers/Http';
import { Beer } from "../../src/model";

@suite("Beer")
class BeerSuite {

  static async before() {
    await app.start();
  }

  async before() {
    await app.clearDatabase();
  }

  @test("List all beers")
  async listBeerTest() {
    let list = await http.get<Beer[]>('/api/beer');
    assert.equal(6, list.length); // there is 6 default beer types
  }

  @test("New beer")
  async newTest() {
    await http.post<Beer>('/api/beer', {
      name: 'Natural Beer',
      maxTemperature: 20,
      minTemperature: 10,
    });
    let list = await http.get<Beer[]>('/api/beer');
    assert.equal(7, list.length); // there is 6 default beer types
  }
}