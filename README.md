# Beer Inside

Beer Inside is a temperature monitoring service for micro brewery deliveries.

## Assumptions

We assume that:

* This is not a final product. It SHOULD be validated before use.
* There is a container that can transport beer and it is refrigerated. This container can send HTTP request to this server with the required information.

## How it works

Every beer container has a internal sensor that sends every minute its temperature to our server. So, when it is time to make a delivery, the micro brewery can load the truck with all information (beers + container code) and just open our monitor to check if everything is ok!

## Architecture

This application doesn't use any database. It store all in memory/file.

## Running

For a simple test, just execute:

```
npm install
npm start
```

Now you can access: http://localhost:3000 and create trucks with containers

## API Docs

| Method | Endpoint                                       | Description                                  | Request Payload  |
| :---:  | ---                                            | ---                                          | ---   |
| GET    | /beer                                          | List all available beers                     | N/A   |
| POST   | /beer                                          | Create a new beer                            | `{  name: 'Natural Beer', maxTemperature: 20, minTemperature: 10}` |
| GET    | /container                                     | List all available containers                | N/A   |
| GET    | /container/**:containerId**                    | Get container information                    | N/A   |
| PUT    | /container/**:containerId**                    | Update container temperature                 | `{ temperature: 20 }` |
| GET    | /truck                                         | List all trucks                              | N/A   |
| POST   | /truck                                         | Create a new truck                           | `{ containers: [ { beerIds: [...'id', code: 'container-code' } ], driverName: "Jonh Doe" }` |
| GET    | /truck/**:truckId**                            | Get truck information                        | N/A   |
| DELETE | /truck/**:truckId**                            | Remove truck and containers inside           | N/A   |
| GET    | /truck/**:truckId**/container                  | List all available containers for this truck | N/A   |
| PUT    | /truck/**:truckId**/container                  | Create a new Container for this truck        | `{ beerIds: [...'id', code: 'container-code' }` |
| GET    | /truck/**:truckId**/container/**:containerId** | Get container information for this truck     | N/A |
| PUT    | /truck/**:truckId**/container/**:containerId** | Update container temperature for this truck  | `{ temperature: 20 }` |

## Highlights

This is a simple web service! It only handle the monitoring of brew containers. There is a lack of validation and status checks. All code is organized in layers, the layers are implemented in:

* **Controllers**: `./src/routes`
* **Services**: `./src/service`
* **Persistence**: `./src/data`

It is used Typescript to make the code more reliable and easy to validate.


## Possible Improvements

* Database to store data
  * The persistence layer is already implemented as is an database. It can bee easily replaced by an NoSQL database like Mongo.
* Authentication
  * There is no Authentication, anyone can update the container temperature without no check!
* Warning
  * There is no warning when the temperature is out of the range for a given container. When this situation occurs, a email can be sent to the brewery.
* Time history
  * There is no history! The service just store the actual temperature. It can be improved storing all temperatures and make graphs of it.
* Reports
  * No data is store forever! We can store the old data and create reports. How many deliveries has temperature problems? Where this deliveries has problems? Which type of beer is the worst to delievery (has more problem)? With this reports the price of the delivery can be better calculated.
* Geolocation
  * This is a IoT service. The most important data is generate by sensors. It can store geolocation information to know more where problems are occurring and create a more detail report.