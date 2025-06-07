# Node.js PostgreSQL Server

A Node.js server application that handles HTTP requests and connects to a PostgreSQL database.

## Features

- RESTful API endpoints for:
  - Users management
  - Service requests
  - AC listings
  - Buyer inquiries
- PostgreSQL database integration
- CORS enabled
- Error handling

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

### Service Requests
- GET `/api/service-requests` - Get all service requests
- POST `/api/service-requests` - Create a new service request

### AC Listings
- GET `/api/ac-listings` - Get all AC listings
- POST `/api/ac-listings` - Create a new AC listing

### Buyer Inquiries
- GET `/api/buyer-inquiries` - Get all buyer inquiries
- POST `/api/buyer-inquiries` - Create a new buyer inquiry

## Database Schema

The server works with the following tables:
- users
- service_requests
- ac_listings
- buyer_inquiries

Each endpoint handles the corresponding table operations with proper field validation and error handling. 