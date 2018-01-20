import { suite, test, slow, timeout } from "mocha-typescript";
import * as assert from 'assert';
import app from '../helpers/App';
import http from '../helpers/Http';
import { ITruck, IBeer, IBeerContainer } from "../../src/model/index";
import uuidv4 = require('uuid/v4');

@suite("Container")
class ContainerSuite {

  static async before() {
    await app.start();
  }
  
}