const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Routes

// Users routes
app.get('/api/users', async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

app.post('/api/users', async (req, res, next) => {
    const { username, email, password, is_admin } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO users (username, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, password, is_admin]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Service Requests routes
app.get('/api/service-requests', async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM service_requests');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

app.post('/api/service-requests', async (req, res, next) => {
    const { name, email, phone, service_type, address, preferred_date, message, status } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO service_requests (name, email, phone, service_type, address, preferred_date, message, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [name, email, phone, service_type, address, preferred_date, message, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// AC Listings routes
app.get('/api/ac-listings', async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM ac_listings');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

app.post('/api/ac-listings', async (req, res, next) => {
    const { title, description, brand, manufacturing_year, ac_type, dimensions, no_of_ac, price, photos, status } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO ac_listings (title, description, brand, manufacturing_year, ac_type, dimensions, no_of_ac, price, photos, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [title, description, brand, manufacturing_year, ac_type, dimensions, no_of_ac, price, photos, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Buyer Inquiries routes
app.get('/api/buyer-inquiries', async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM buyer_inquiries');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

app.post('/api/buyer-inquiries', async (req, res, next) => {
    const { ac_listing_id, full_name, email, phone, address, city, state, message, preferred_contact_time, status } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO buyer_inquiries (ac_listing_id, full_name, email, phone, address, city, state, message, preferred_contact_time, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [ac_listing_id, full_name, email, phone, address, city, state, message, preferred_contact_time, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found', path: req.path });
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
}); 