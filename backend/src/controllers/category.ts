import { Express } from 'express';
import { Connection } from 'mysql';

const getCategoriesQuery = `SELECT * FROM categories`;

const addCategoryQuery = (name: string) =>
  `INSERT INTO categories (name) VALUES (${name})`;

const deleteCategoryQuery = (id: number) =>
  `DELETE FROM categories WHERE id = ${id}`;

export default function (app: Express, db: Connection) {
  app.get('/categories', (req, res) => {
    db.query(getCategoriesQuery, (err, result) => {
      res.json(result);
    });
  });

  app.post('/categories', (req, res) => {
    const { name } = req.body;

    db.query(addCategoryQuery(db.escape(name)), (err, result) => {
      res.json(result);
    });
  });

  app.delete('/categories/:id', (req, res) => {
    const id = Number(req.params.id);

    db.query(deleteCategoryQuery(id), (req, result) => {
      res.json(result);
    });
  });
}
