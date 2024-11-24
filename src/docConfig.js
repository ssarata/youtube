import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
const config = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API user video',
      version: '1.0.0',
      description: 'Gestion des utilisateurs et videos',
    },
    // servers: [
    //   {
    //     url: 'http://localhost:3000/api-docs',
    //   },
    // ],
  },
  apis: ['./src/routes/userRouter.js','./src/routes/videoRouter.js', './src/controllers/userController.js', './src/controllers/videoController.js'], 
};
const specs = swaggerJsdoc(config);

export default (app)=>{
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
} ;
