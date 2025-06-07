const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_Ybrl6uhX2LVc@ep-muddy-sun-a841goek-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
});

module.exports = pool; 