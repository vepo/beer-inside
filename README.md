# Beer Inside

Beer Inside is a temperature monitoring service for micro brewery deliveries.

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

| Method | Endpoint                                       | Description                                  | body  |
| :---:  | ---                                            | ---                                          | N/A   |
| GET    | /beer                                          | List all available beers                     | N/A   |
| POST   | /beer                                          | Create a new beer                            | {  name: 'Natural Beer', maxTemperature: 20, minTemperature: 10}` |
| GET    | /container                                     | List all available containers                |
| POST   | /container/**:containerId**                    | Get container information                    |
| PUT    | /container/**:containerId**                    | Update container temperature                 |
| GET    | /truck                                         | List all trucks                              |
| POST   | /truck                                         | Create a new truck                           |
| GET    | /truck/**:truckId**                            | Get truck information                        |
| GET    | /truck/**:truckId**/container                  | List all available containers for this truck |
| PUT    | /truck/**:truckId**/container                  | Create a new Container for this truck        |
| POST   | /truck/**:truckId**/container/**:containerId** | Get container information for this truck     |
| PUT    | /truck/**:truckId**/container/**:containerId** | Update container temperature for this truck  |
