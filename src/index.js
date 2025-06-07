const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Users routes
app.get('/api/users', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    const { username, email, password, is_admin } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO users (username, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, password, is_admin]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Service Requests routes
app.get('/api/service-requests', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM service_requests');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/service-requests', async (req, res) => {
    const { name, email, phone, service_type, address, preferred_date, message, status } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO service_requests (name, email, phone, service_type, address, preferred_date, message, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [name, email, phone, service_type, address, preferred_date, message, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// AC Listings routes
app.get('/api/ac-listings', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM ac_listings');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/ac-listings', async (req, res) => {
    const { title, description, brand, manufacturing_year, ac_type, dimensions, no_of_ac, price, photos, status } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO ac_listings (title, description, brand, manufacturing_year, ac_type, dimensions, no_of_ac, price, photos, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [title, description, brand, manufacturing_year, ac_type, dimensions, no_of_ac, price, photos, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Buyer Inquiries routes
app.get('/api/buyer-inquiries', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM buyer_inquiries');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/buyer-inquiries', async (req, res) => {
    const { ac_listing_id, full_name, email, phone, address, city, state, message, preferred_contact_time, status } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO buyer_inquiries (ac_listing_id, full_name, email, phone, address, city, state, message, preferred_contact_time, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [ac_listing_id, full_name, email, phone, address, city, state, message, preferred_contact_time, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 