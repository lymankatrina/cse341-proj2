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
    description: 'This is a simple REST API developed by for a school project assignment',
    contact: {
      name: 'KatrinaLyman',
      url: 'https://github.com/lymankatrina/cse341-proj2'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server'
    },
    {
      url: 'https://cse341-proj2-898t.onrender.com/',
      description: 'Render website'
    }
  ],
  paths: {},
  tags: [],
  components: {}
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
