/* 
    - ao importar uma biblioteca com typescript, precisamos também da lista de definições de tipos
    - caso uma biblioteca não venha com a definição junto, precisamos instalar essa "lista" separadamente
    - podemos usar o comando npm install @types/express para instalar essas definições, por exemplo
*/

import express from 'express';

const app = express();

app.get('/users', (req, res) => {
    console.log('Listagem de Usuários');
    res.json([
        'Diego',
        'Cleiton',
        'Joãozinho',
    ]);
});

app.listen(3333);