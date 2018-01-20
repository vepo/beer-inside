import { suite, test, slow, timeout } from "mocha-typescript";
import * as assert from 'assert';
import app from '../helpers/App';
import http from '../helpers/Http';
import { IBeer } from "../../src/model";

@suite("Beer")
class BeerSuite {

  static async before() {
    await app.start();
  }

  @test("List all beers")
  async listBeerTest() {
    let list = await http.get<IBeer[]>('/api/beer');
    assert.equal(6, list.length); // there is 6 default beer types
  }
}