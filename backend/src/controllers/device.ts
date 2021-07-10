import { Express } from 'express';
import { Connection } from 'mysql';

const getDevicesQuery = `SELECT * FROM devices`;

const addDeviceQuery = (color: string, partNumber: number, category: number) =>
  `INSERT INTO devices (color, partNumber, category) VALUES (${color}, ${partNumber}, ${category})`;

const deleteDeviceQuery = (id: number) =>
  `DELETE FROM devices WHERE id = ${id}`;

export default function (app: Express, db: Connection) {
  app.get('/devices', (req, res) => {
    db.query(getDevicesQuery, (err, result) => {
      res.json(result);
    });
  });

  app.post('/devices', (req, res) => {
    const { color, partNumber, category } = req.body;

    db.query(
      addDeviceQuery(db.escape(color), partNumber, category),
      (err, result) => {
        if (err) {
          console.error(err);
        }
        res.json(result);
      }
    );
  });

  app.delete('/devices/:id', (req, res) => {
    const id = Number(req.params.id);

    db.query(deleteDeviceQuery(id), (req, result) => {
      res.json(result);
    });
  });
}
