#!/bin/bash

# Update system packages
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -y pm2 -g

# Create app directory
sudo mkdir -p /var/www/server-node
sudo chown -R $USER:$USER /var/www/server-node

# Copy application files
cp -r ./* /var/www/server-node/

# Navigate to app directory
cd /var/www/server-node

# Install dependencies
npm install --production

# Start the application with PM2
pm2 start src/index.js --name "ac-server"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp /home/$USER 