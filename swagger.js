const options = {
  openapi: '3.0.0',
  autoHeaders: true,
  autoQuery: true,
  autoBody: true
};
const swaggerAutogen = require('swagger-autogen')(options);

const doc = {
  info: {
    version: '1.0.0',
    title: 'Pets and Owners API',
    description:
      'This is a simple REST API developed by Katrina Lyman for a school project assignment',
    contact: {
      name: 'KatrinaLyman',
      url: 'https://github.com/lymankatrina/cse341proj2'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server'
    },
    {
      url: 'https://cse341proj2.onrender.com/',
      description: 'Render website'
    }
  ],
  paths: {},
  schemes: {},
  produces: {},
  tags: [],
  definitions: {},
  components: {}
};

const outputFile = './swagger-output.json';
const endpointsFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFile, doc);
