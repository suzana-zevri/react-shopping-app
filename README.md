
This is a playground web shop app powered by React with ES2017, Next, Redux and Semantic UI

## Requirements
You need to provide the api endpoints.
Currently it is using a `docker` image for serving as a sample API

## Usage
Make sure you have `docker`, `nodejs > 6.x` and `npm > 3.x` installed 
then install all required packages via `npm install` (this will install and run also the docker api image)
If the docker container is already running you can stop it via `npm run api:stop` or run it again using `npm run api:start`

### Running the application
Build start and open the browser at `http://localhost:3000/` or using a new terminal session `npm run open`

```bash
npm run start
```

## Development and Testing

### Running dev version
```bash
npm run dev && npm run open
```

### Running the tests
* `npm run test`
* `npm run test:watch`
* `npm run test:coverage`
