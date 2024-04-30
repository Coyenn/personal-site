#!/usr/bin/env bash

cd "$(dirname "$0")/../"
set -e

# Create a backup directory
mkdir -p backups
cd backups

# Test if pg_dump is installed
if ! command -v pg_dump &>/dev/null; then
  echo "pg_dump is not installed. Please install it and try again."
  exit 1
fi

# Get the current date and time
date=$(date +"%Y-%m-%d_%H%M%S")

# Read connection data from the user
read -r -p "Enter the database host: (e.g. 'localhost') " host
read -r -sp "Enter the password: " password
read -r -p "Enter the schema name: (e.g. 'public') " schema
read -r -p "Enter the database name: (e.g. 'verceldb') " database

# Get the current date and time
date=$(date +"%Y-%m-%d_%H%M%S")

# Create a tar file with the current database
export PGPASSWORD="$password"
pg_dump --verbose --username=default --format=t --file="./$date.tar" --host="$host" --port=5432 --schema="$schema" "$database"

echo "Backup created successfully!"
