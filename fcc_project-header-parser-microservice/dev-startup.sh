#!/bin/bash

desired_node_version=$(<.nvmrc)

echo "Starting up..."
echo "Unsetting npm_config_prefix"
unset npm_config_prefix


# Source nvm.sh
source /Users/tiffinijohnson/.nvm/nvm.sh

# Check if the desired version is already installed
if nvm list | grep -q "$desired_node_version"; then
  echo "Node.js version $desired_node_version is already installed."
else
  echo "Node.js version $desired_node_version is not installed. Installing..."
  nvm install "$desired_node_version"
fi

# Verify installation
if nvm use "$(<.nvmrc)"; then
  echo "Node.js version $desired_node_version is now active."
else
  echo "Failed to activate Node.js version $desired_node_version."
fi


# Change directory to your project directory
cd /Users/tiffinijohnson/Repos/PracticeRepos/FCC/fcc_header-parser-microservice

echo "Updating dependencies..."
npm update
# Start your server using nodemon

echo "Starting server..."
nodemon server.js


