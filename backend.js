const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 4000;

const db = new sqlite3.Database(path.join(__dirname, 'chefsit.db'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/chefs', (req, res) => {
  db.all('SELECT * FROM chefs', [], (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

app.get('/bookings', (req, res) => {
  db.all('SELECT * FROM bookings', [], (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

app.get('/discounts', (req, res) => {
  db.all('SELECT * FROM discounts', [], (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));