import { Express } from 'express';
import { Connection } from 'mysql';

const getDevicesQuery = `SELECT d.id, d.color, d.partNumber, c.name as categoryName FROM devices d INNER JOIN categories c ON d.category = c.id`;

const getSingleDeviceQuery = (id: number) =>
  `SELECT d.id, d.color, d.partNumber, c.name as categoryName FROM devices d INNER JOIN categories c ON d.category = c.id WHERE d.id = ${id}`;

const addDeviceQuery = (color: string, partNumber: number, category: number) =>
  `INSERT INTO devices (color, partNumber, category) VALUES (${color}, ${partNumber}, ${category})`;

const deleteDeviceQuery = (id: number) =>
  `DELETE FROM devices WHERE id = ${id}`;

const getInsertedIdQuery = `SELECT LAST_INSERT_ID();`;

export default function (app: Express, db: Connection) {
  app.get('/devices', (req, res) => {
    db.query(getDevicesQuery, (err, result) => {
      res.json(result);
    });
  });

  app.post('/devices', (req, res) => {
    const { color, partNumber, category } = req.body;

    db.query(addDeviceQuery(db.escape(color), partNumber, category), (err) => {
      if (err) {
        console.error(err);
      }
      if (!err) {
        db.query(getInsertedIdQuery, (err, result) => {
          if (result) {
            const id = result[0]['LAST_INSERT_ID()'];
            db.query(getSingleDeviceQuery(id), (err, devices) => {
              res.json(devices[0]);
            });
          }
        });
      }
    });
  });

  app.delete('/devices/:id', (req, res) => {
    const id = Number(req.params.id);

    db.query(deleteDeviceQuery(id), (req, result) => {
      res.json(result);
    });
  });
}
