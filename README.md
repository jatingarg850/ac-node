# Node.js PostgreSQL Server

A Node.js server application that handles HTTP requests and connects to a PostgreSQL database.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Users
- GET `/api/users` - Get all users
- POST `/api/users` - Create a new user
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "is_admin": boolean
  }
  ```

### Service Requests
- GET `/api/service-requests` - Get all service requests
- POST `/api/service-requests` - Create a new service request
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "service_type": "string",
    "address": "string",
    "preferred_date": "date",
    "message": "string",
    "status": "string"
  }
  ```

### AC Listings
- GET `/api/ac-listings` - Get all AC listings
- POST `/api/ac-listings` - Create a new AC listing
  ```json
  {
    "title": "string",
    "description": "string",
    "brand": "string",
    "manufacturing_year": number,
    "ac_type": "string",
    "dimensions": "string",
    "no_of_ac": number,
    "price": number,
    "photos": "string[]",
    "status": "string"
  }
  ```

### Buyer Inquiries
- GET `/api/buyer-inquiries` - Get all buyer inquiries
- POST `/api/buyer-inquiries` - Create a new buyer inquiry
  ```json
  {
    "ac_listing_id": number,
    "full_name": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "message": "string",
    "preferred_contact_time": "string",
    "status": "string"
  }
  ```

## Server Configuration
The server runs on port 3000 by default. You can change this by setting the `PORT` environment variable. 