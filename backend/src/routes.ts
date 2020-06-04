import express from 'express';

const routes = express.Router(); // desacoplando as rotas do arquivo principal para o nosso arquivo de rotas

routes.get('/', (request, response) => {
    return response.send('Hello World');
});

export default routes;