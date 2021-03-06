import { suite, test, slow, timeout } from "mocha-typescript";
import * as assert from 'assert';
import app from '../helpers/App';
import http from '../helpers/Http';
import { Beer, Container, Truck } from "../../src/model";
import uuidv4 = require('uuid/v4');

@suite("Truck")
class TruckSuite {

  static async before() {
    await app.start();
  }

  async before() {
    await app.clearDatabase();
  }

  @test("List trucks")
  async listTruckTest() {
    let list = await http.get<Truck[]>('/api/truck');
    assert.equal(0, list.length);
  }

  @test("Create a truck")
  async createTruckTest() {
    let beers = await http.get<Beer[]>('/api/beer');
    let truck = await http.post<Truck>('/api/truck', {
      containers: [
        {
          beerIds: [beers[0].id],
          code: uuidv4()
        }
      ],
      driverName: "Jonh Doe"
    });
    assert.ok(truck);
  }

  @test("Create a truck & Add a container")
  async addContainerTest() {
    let beers = await http.get<Beer[]>('/api/beer');
    let truck = await http.post<Truck>('/api/truck', {
      containers: [
        {
          beerIds: [beers[0].id],
          code: uuidv4()
        }
      ],
      driverName: "Jonh Doe"
    });
    let container = await http.put<Container>('/api/truck/' + truck.id + '/container', {
      beerIds: [beers[1].id],
      code: uuidv4(),
    });
    assert.equal(1, container.beers.length);
    truck = await http.get<Truck>('/api/truck/' + truck.id);
    assert.equal(2, truck.containers.length);
  }

  @test("Validate Container temperature")
  async validateContainerTemperatureTest() {
    try {
      let beers = await http.get<Beer[]>('/api/beer');
      await http.post<Truck>('/api/truck', {
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

  @test("Add a duplicated Container")
  async duplicatedContainerTest() {
    try {
      let code = uuidv4();
      let beers = await http.get<Beer[]>('/api/beer');
      await http.post<Truck>('/api/truck', { containers: [{ beerIds: [beers[0].id], code: code }], driverName: "Jonh Doe" });
      await http.post<Truck>('/api/truck', { containers: [{ beerIds: [beers[1].id], code: code }], driverName: "Jonh Doe" });
      assert.fail('It should throw an error!');
    } catch (err) {
      assert.equal(409, err.code, 'It should return conflict!');
    }
  }

  @test("Delete Truck")
  async deleteTruckTest() {
    let code = uuidv4();
    let beers = await http.get<Beer[]>('/api/beer');
    await http.post<Truck>('/api/truck', { containers: [{ beerIds: [beers[0].id], code: uuidv4() }], driverName: "Jonh Doe" });
    let truck = await http.post<Truck>('/api/truck', { containers: [{ beerIds: [beers[0].id], code: code }], driverName: "Jonh Doe" });
    await http.delete('/api/truck/' + truck.id);
    await http.post<Truck>('/api/truck', { containers: [{ beerIds: [beers[1].id], code: code }], driverName: "Jonh Doe" });
  }

  @test("Bad Request")
  async badRequestTest() {
    let beers = await http.get<Beer[]>('/api/beer');
    await http.post<Truck>('/api/truck', { containers: [{ beerIds: [beers[1].id], code: uuidv4() }] });
    try {
      await http.post<Truck>('/api/truck', { containers: [], driverName: "Jonh Doe" });
      assert.fail('It should throw an error!');
    } catch (err) {
      assert.equal(400, err.code, 'It should return Bad Request!');
    }
    try {
      await http.post<Truck>('/api/truck', { containers: [{ beerIds: [beers[1].id], code: null }] });
      assert.fail('It should throw an error!');
    } catch (err) {
      assert.equal(400, err.code, 'It should return Bad Request!');
    }
  }

  @test("Not Found")
  async notFoundTest() {
    try {
      await http.get('/api/truck/aaaaaaa');
    } catch (err) {
      assert.equal(404, err.code, 'It should return Not Found!');
    }
    
  }
}