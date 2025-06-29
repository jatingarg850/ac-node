const express = require('express');
const cors = require('cors');
const db = require('./config/db');

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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    const { username, email, password, is_admin, account_type, photo_link } = req.body;
    try {
        const result = await db.query(
            'UPDATE users SET username = $1, email = $2, password = $3, is_admin = $4, account_type = $5, photo_link = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
            [username, email, password, is_admin, account_type, photo_link, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.delete('/api/users/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Service Requests routes
app.get('/api/service-requests', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM service_requests');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/service-requests/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM service_requests WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service request not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/service-requests/:id', async (req, res) => {
    const { name, email, phone, service_type, address, preferred_date, message, status } = req.body;
    try {
        const result = await db.query(
            'UPDATE service_requests SET name = $1, email = $2, phone = $3, service_type = $4, address = $5, preferred_date = $6, message = $7, status = $8 WHERE id = $9 RETURNING *',
            [name, email, phone, service_type, address, preferred_date, message, status, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service request not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/service-requests/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM service_requests WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service request not found' });
        }
        res.json({ message: 'Service request deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// AC Listings routes
app.get('/api/ac-listings', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM ac_listings');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/ac-listings/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM ac_listings WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'AC listing not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/ac-listings/:id', async (req, res) => {
    const { title, description, brand, manufacturing_year, ac_type, dimensions, no_of_ac, price, photos, status } = req.body;
    try {
        const result = await db.query(
            'UPDATE ac_listings SET title = $1, description = $2, brand = $3, manufacturing_year = $4, ac_type = $5, dimensions = $6, no_of_ac = $7, price = $8, photos = $9, status = $10, updated_at = CURRENT_TIMESTAMP WHERE id = $11 RETURNING *',
            [title, description, brand, manufacturing_year, ac_type, dimensions, no_of_ac, price, photos, status, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'AC listing not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/ac-listings/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM ac_listings WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'AC listing not found' });
        }
        res.json({ message: 'AC listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Buyer Inquiries routes
app.get('/api/buyer-inquiries', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM buyer_inquiries');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/buyer-inquiries/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM buyer_inquiries WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Buyer inquiry not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/buyer-inquiries/:id', async (req, res) => {
    const { ac_listing_id, full_name, email, phone, address, city, state, message, preferred_contact_time, status } = req.body;
    try {
        const result = await db.query(
            'UPDATE buyer_inquiries SET ac_listing_id = $1, full_name = $2, email = $3, phone = $4, address = $5, city = $6, state = $7, message = $8, preferred_contact_time = $9, status = $10 WHERE id = $11 RETURNING *',
            [ac_listing_id, full_name, email, phone, address, city, state, message, preferred_contact_time, status, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Buyer inquiry not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/buyer-inquiries/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM buyer_inquiries WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Buyer inquiry not found' });
        }
        res.json({ message: 'Buyer inquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
