/* 
    - ao importar uma biblioteca com typescript, precisamos também da lista de definições de tipos
    - caso uma biblioteca não venha com a definição junto, precisamos instalar essa "lista" separadamente
    - podemos usar o comando npm install @types/express para instalar essas definições, por exemplo
*/

import express, { response } from 'express';

const app = express();

const users = [
    'Diego', // 0
    'Cleiton', // 1
    'Joãozinho', // 2
];

app.get('/users', (req, res) => {
    console.log('Listagem de Usuários');
    return res.json(users);
});

app.get('/users/:pos', (req, res) => {
    const pos = Number(req.params.pos);

    const user = users[pos];

    return res.json(user);
});

app.post('/users', (req, res) => {
    console.log('POST usuários');
    const user = {
        name: 'Cláudia',
        email: 'clau@gmail.com'
    }

    return res.json(user);
})

app.listen(3333);