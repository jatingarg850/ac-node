# Node.js PostgreSQL Server

A Node.js server application that handles HTTP requests and connects to a PostgreSQL database.

## Local Setup

1. Install dependencies:
```bash
npm install
```

2. Build the application:
```bash
npm run build
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Build Process

The application uses a build process to prepare for deployment:

1. Clean the dist directory:
```bash
npm run clean
```

2. Build the application:
```bash
npm run build
```

This will:
- Create a `dist` directory
- Copy all source files to `dist`
- Copy necessary configuration files

## AWS EC2 Deployment

### Prerequisites
1. An AWS account with EC2 access
2. An EC2 instance running Ubuntu (recommended: t2.micro for testing)
3. SSH access to your EC2 instance
4. Security group with the following ports open:
   - Port 22 (SSH)
   - Port 3000 (Application)

### Deployment Steps

1. Connect to your EC2 instance:
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

2. Clone the repository:
```bash
git clone https://github.com/jatingarg850/ac-server-main.git
cd ac-server-main
```

3. Make the deployment script executable:
```bash
chmod +x deploy.sh
```

4. Run the deployment script:
```bash
./deploy.sh
```

The script will:
- Install Node.js and npm
- Install PM2 for process management
- Build the application
- Set up the application in /var/www/server-node
- Start the server using PM2
- Configure PM2 to start on system boot

### CI/CD Configuration

The project includes a `buildspec.yml` file for AWS CodeBuild integration. This configuration:
- Installs Node.js 18
- Installs dependencies
- Builds the application
- Creates artifacts in the `dist` directory
- Caches node_modules for faster builds

### Monitoring and Management

- Check application status: `pm2 status`
- View logs: `pm2 logs ac-server`
- Restart application: `pm2 restart ac-server`
- Stop application: `pm2 stop ac-server`

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