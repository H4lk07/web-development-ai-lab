const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Web Development Using AI - Academic RESTful API',
      version: '1.0.0',
      description: 'RESTful API gateway developed for Web Development Using AI college practical record (2026-27), tested with Swagger and Postman.',
      contact: {
        name: 'Mayank Goyal',
        email: 'mayank.goyal@jecrcu.edu.in'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local Development Server'
      },
      {
        url: 'https://webdev-ai-backend.onrender.com',
        description: 'Production Render Service'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'category', 'price'],
          properties: {
            _id: { type: 'string', example: 'prod_1' },
            name: { type: 'string', example: 'Tidewave Desk Lamp' },
            description: { type: 'string', example: 'Warm-tone LED Lamp with USB-C charging dock.' },
            category: { type: 'string', enum: ['electronics', 'apparel', 'books', 'home'], example: 'home' },
            price: { type: 'number', example: 49.99 },
            quantity: { type: 'integer', example: 18 },
            inStock: { type: 'boolean', example: true }
          }
        },
        Task: {
          type: 'object',
          required: ['title'],
          properties: {
            _id: { type: 'string', example: 'task_1' },
            title: { type: 'string', example: 'Complete Lab Record Experiments' },
            description: { type: 'string', example: 'Implement 15 practical experiments' },
            priority: { type: 'string', enum: ['low', 'medium', 'high'], example: 'high' },
            done: { type: 'boolean', example: false }
          }
        },
        Student: {
          type: 'object',
          required: ['name', 'rollNo', 'email', 'course'],
          properties: {
            _id: { type: 'string', example: 'stud_1' },
            name: { type: 'string', example: 'Mayank Goyal' },
            rollNo: { type: 'string', example: '23BCON1662' },
            email: { type: 'string', example: 'mayank.goyal@jecrcu.edu.in' },
            course: { type: 'string', enum: ['CSE', 'ECE', 'ME', 'CE'], example: 'CSE' },
            year: { type: 'integer', example: 4 },
            gpa: { type: 'number', example: 9.2 }
          }
        }
      }
    }
  },
  apis: ['./server/routes/*.js']
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification;
