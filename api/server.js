const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

dotenv.config();

const createDatabaseConnection = () => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'plantscare_csa',
        multipleStatements: true,
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            process.exit(1);
        } else {
            console.log('Connected to the database');
        }
    });

    return connection;
};

const db = createDatabaseConnection();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get('/plants', (req, res) => {
    const query = 'SELECT * FROM plants';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching plants:', err.message);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

app.get('/plants/:id', (req, res) => {
    const plantId = req.params.id;
    const query = 'SELECT * FROM plants WHERE id = ?';
    db.query(query, [plantId], (err, results) => {
        if (err) {
            console.error('Error fetching plant:', err.message);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Plant not found' });
        }
        res.json(results[0]);
    });
});

app.post('/plants', (req, res) => {
    const { name, species, water_interval_days } = req.body;
    const query = 'INSERT INTO plants (name, species, water_interval_days) VALUES (?, ?, ?)';
    db.query(query, [name, species, water_interval_days], (err, results) => {
        if (err) {
            console.error('Error inserting plant:', err.message);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.status(201).json({ id: results.insertId, name, species, water_interval_days });
    });
});

app.patch('/plants/:id', (req, res) => {
    const plantId = req.params.id;
    const { name, species, water_interval_days } = req.body;
    const query = 'UPDATE plants SET name = ?, species = ?, water_interval_days = ? WHERE id = ?';
    db.query(query, [name, species, water_interval_days, plantId], (err, results) => {
        if (err) {
            console.error('Error updating plant:', err.message);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Plant not found' });
        }
        res.json({ id: plantId, name, species, water_interval_days });
    });
});

app.delete('/plants/:id', (req, res) => {
    const plantId = req.params.id;
    const query = 'DELETE FROM plants WHERE id = ?';
    db.query(query, [plantId], (err, results) => {
        if (err) {
            console.error('Error deleting plant:', err.message);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Plant not found' });
        }
        res.status(200).send();
    });
});

app.get('/stats', (req, res) => {
    const query = `SELECT * FROM statistics`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching plant stats:', err.message);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

app.get('/plants/:id/waterings', (req, res) => {
    const plantId = req.params.id;
    const query = `SELECT * FROM watering_logs WHERE plant_id = ?`;
    db.query(query, [plantId], (err, results) => {
        if (err) {
            console.error('Error fetching watering logs:', err.message);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

app.post('/waterings', (req, res) => {
    const { plant_id, date_watered, amount_ml, notes } = req.body;
    const query = `INSERT INTO watering_logs (plant_id, date_watered, amount_ml, notes) VALUES (?, ?, ?, ?)`;
    db.query(query, [plant_id, date_watered, amount_ml, notes], (err, results) => {
        if (err) {
            console.error('Error logging watering:', err.message);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.status(201).json({ id: results.insertId, plant_id, date_watered, amount_ml, notes });
    });
});

app.delete('/waterings/:id', (req, res) => {
    const logId = req.params.id;
    const query = `DELETE FROM watering_logs WHERE id = ?`;
    db.query(query, [logId], (err, results) => {
        if (err) {
            console.error('Error deleting watering log:', err.message);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Watering log not found' });
        }
        res.status(200).send();
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});