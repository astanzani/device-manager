import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import categoryController from './controllers/category';
import deviceController from './controllers/device';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

async function start() {
  const port = process.env.PORT ?? 8080;

  const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  dbConnection.connect((err) => {
    if (err) {
      console.error(err);
    }
  });

  categoryController(app, dbConnection);
  deviceController(app, dbConnection);

  app.use(express.static(path.join(__dirname, '../../frontend/dist/frontend')));

  app.get('/*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '../../frontend/dist/frontend/index.html')
    );
  });

  app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
  });
}

start();
