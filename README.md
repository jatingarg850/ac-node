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

## AWS EC2 Deployment

### Prerequisites

1. An AWS account
2. An EC2 instance running Ubuntu 20.04 or later
3. Security Group Configuration:
   - Allow inbound traffic on port 22 (SSH)
   - Allow inbound traffic on port 80 (HTTP)
   - Allow inbound traffic on port 443 (HTTPS) if using SSL
4. A domain name (optional)

### Instance Setup

1. Launch an EC2 instance:
   - Choose Ubuntu Server 20.04 LTS or later
   - Select t2.micro (free tier) or larger
   - Configure security group as mentioned above
   - Create or select an existing key pair

2. Connect to your instance:
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### Deployment Steps

1. Clone the repository:
```bash
git clone https://github.com/jatingarg850/ac-server-main.git
cd ac-server-main
```

2. Make the deployment script executable:
```bash
chmod +x deploy.sh
```

3. Run the deployment script:
```bash
./deploy.sh
```

The script will:
- Install Node.js and npm
- Install and configure PM2 for process management
- Install and configure Nginx as a reverse proxy
- Build and start the application
- Configure automatic startup on system reboot

### Post-Deployment

Your application will be available at:
- `http://your-ec2-ip`

To monitor the application:
```bash
# View PM2 process status
pm2 status

# View application logs
pm2 logs ac-server

# Monitor CPU/Memory usage
pm2 monit
```

### Common Commands

```bash
# Restart the application
pm2 restart ac-server

# Stop the application
pm2 stop ac-server

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
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

## Troubleshooting

1. If the application fails to start:
   ```bash
   # Check PM2 logs
   pm2 logs ac-server
   
   # Check Node.js process
   ps aux | grep node
   ```

2. If Nginx fails:
   ```bash
   # Check Nginx status
   sudo systemctl status nginx
   
   # Test Nginx configuration
   sudo nginx -t
   ```

3. If port 80 is blocked:
   ```bash
   # Check if something is using port 80
   sudo lsof -i :80
   
   # Check firewall status
   sudo ufw status
   ```

## Build Process

The application uses a build process to prepare for deployment:

1. Clean and build the application:
```bash
npm run build
```

This will:
- Clean the `dist` directory
- Create a new `dist` directory
- Copy all source files to `dist`
- Copy package configuration files

## AWS Amplify Deployment

The application is configured for deployment with AWS Amplify. The build process is defined in `amplify.yml` and includes:

### Build Phases
1. Backend Build:
   - Install dependencies with `npm ci`
   - Build the application
   
2. Frontend Build:
   - Install dependencies
   - Build the application

### Artifacts
- All built files from the `dist` directory are included
- Node modules are cached for faster builds

### Manual EC2 Deployment

If you prefer to deploy manually to EC2, follow these steps:

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

### Monitoring and Management

- Check application status: `pm2 status`
- View logs: `pm2 logs ac-server`
- Restart application: `pm2 restart ac-server`
- Stop application: `pm2 stop ac-server`

## Server Configuration
The server runs on port 3000 by default. You can change this by setting the `PORT` environment variable. 