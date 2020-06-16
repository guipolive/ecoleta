/* 
    - ao importar uma biblioteca com typescript, precisamos também da lista de definições de tipos
    - caso uma biblioteca não venha com a definição junto, precisamos instalar essa "lista" separadamente
    - podemos usar o comando npm install @types/express para instalar essas definições, por exemplo
*/

import express from 'express';
import path from 'path';
import cors from 'cors'
import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json()); // permite que o express passe a entender corpo de requisição com formatos JSON

app.use(routes); // faz com que o express use as rotas que separamos em outro arquivo de rotas

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))); // servindo arquivos estaticos de uma pasta específica

app.listen(3333);