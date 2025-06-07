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

# Create dist directory and build the application
npm run build

# Copy only the dist directory and necessary files
cp -r dist/* /var/www/server-node/
cp package.json /var/www/server-node/
cp package-lock.json /var/www/server-node/

# Navigate to app directory
cd /var/www/server-node

# Install production dependencies only
npm install --production

# Start the application with PM2
pm2 start index.js --name "ac-server"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp /home/$USER 