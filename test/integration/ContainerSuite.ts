import { suite, test, slow, timeout } from "mocha-typescript";
import * as assert from 'assert';
import app from '../helpers/App';
import http from '../helpers/Http';
import { Beer, Truck, Container } from "../../src/model";
import uuidv4 = require('uuid/v4');

@suite("Container")
class ContainerSuite {
  private beers: Beer[];
  private truck: Truck;

  static async before() {
    await app.start();
  }

  async before() {
    this.beers = await http.get<Beer[]>('/api/beer');
    this.truck = await http.post<Truck>('/api/truck', {
      containers: [
        {
          beerIds: [this.beers[0].id],
          code: uuidv4()
        }
      ],
      driverName: "Jonh Doe"
    });
  }

  @test("Add new Temperature")
  async newTemperatureTest() {
    let container = await http.put<Container>('/api/container/' + this.truck.containers[0].code, { temperature: 20 });
    assert.equal(20, container.temperature);
    assert.equal(20, (await http.get<Container>('/api/container/' + this.truck.containers[0].code)).temperature);
  }

}