#!/bin/bash

# Exit on any error
set -e

echo "Starting deployment process..."

# Update system packages
echo "Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js and npm
echo "Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
echo "Installing PM2..."
sudo npm install -y pm2 -g

# Create app directory
echo "Setting up application directory..."
sudo mkdir -p /var/www/ac-server
sudo chown -R $USER:$USER /var/www/ac-server

# Copy application files
echo "Copying application files..."
cp -r ./* /var/www/ac-server/

# Navigate to app directory
cd /var/www/ac-server

# Install dependencies
echo "Installing dependencies..."
npm ci --production

# Build the application
echo "Building the application..."
npm run build

# Setup PM2 ecosystem file
echo "Configuring PM2..."
cat > ecosystem.config.js << EOL
module.exports = {
  apps: [{
    name: "ac-server",
    script: "dist/index.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production",
      PORT: 80
    }
  }]
}
EOL

# Stop any existing PM2 processes
pm2 stop all || true
pm2 delete all || true

# Start the application with PM2
echo "Starting the application..."
sudo env PATH=$PATH:/usr/bin pm2 start ecosystem.config.js

# Save PM2 configuration
echo "Saving PM2 configuration..."
pm2 save

# Setup PM2 to start on system boot
echo "Configuring PM2 startup..."
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp /home/$USER

# Setup Nginx
echo "Installing and configuring Nginx..."
sudo apt-get install -y nginx

# Create Nginx configuration
echo "Creating Nginx configuration..."
sudo tee /etc/nginx/sites-available/ac-server << EOL
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

# Enable the site
sudo ln -sf /etc/nginx/sites-available/ac-server /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
echo "Testing Nginx configuration..."
sudo nginx -t

# Restart Nginx
echo "Restarting Nginx..."
sudo systemctl restart nginx

echo "Deployment completed successfully!"
echo "Your application should now be running on port 80" 