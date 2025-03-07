#!/bin/sh

echo "Starting n8n..."

# Start n8n in the background
n8n &

echo "Waiting for n8n to be ready..."
until curl -s -o /dev/null "http://localhost:5678"; do
  sleep 5
done

echo "n8n is ready!"

# Import workflows from the workflows folder
n8n import:workflow --separate --input=/home/node/.n8n/workflows

chmod -R 777 /home/node/.n8n/workflows

echo "Workflows imported!"

# Load environment variables
if [ -f /home/node/.env ]; then
  export $(grep -v '^#' /home/node/.env | xargs)
fi


CREDENTIALS_PATH="/home/node/.n8n/credentials"
TEMP_CREDENTIALS_PATH="/home/node/.n8n/temp_credentials"
DB_FILE="/home/node/.n8n/database.sqlite"

if [ -d "$CREDENTIALS_PATH" ]; then
  mkdir -p "$TEMP_CREDENTIALS_PATH"

  for cred_file in "$CREDENTIALS_PATH"/*.json; do
    if [ -f "$cred_file" ]; then
      temp_file="$TEMP_CREDENTIALS_PATH/$(basename "$cred_file")"

      # Check if JSON is an array or object
      if jq -e 'type == "array"' "$cred_file" > /dev/null; then
        # Extract names from an array (keeping each name as a single string)
        CRED_NAMES=$(jq -c 'map(.name)' "$cred_file")
        jq 'map(.id = (if .id then .id else "'"$(uuidgen)"'" end))' "$cred_file" | envsubst > "$temp_file"
      else
        # Extract name from a single object
        CRED_NAMES=$(jq -c '.name' "$cred_file")
        jq '.id = (if .id then .id else "'"$(uuidgen)"'" end)' "$cred_file" | envsubst > "$temp_file"
      fi

      # Check and delete existing credentials
      for CRED_NAME in $CRED_NAMES; do
        CREDENTIAL=$(echo "$CRED_NAME" | jq -r '.[0]')
        EXISTING_ID=$(sqlite3 "$DB_FILE" "SELECT id FROM credentials_entity WHERE name='$CREDENTIAL';")

        if [ -n "$EXISTING_ID" ]; then
          echo "Deleting existing credential: $CREDENTIAL (ID: $EXISTING_ID)"
          sqlite3 "$DB_FILE" "delete FROM credentials_entity WHERE id='$EXISTING_ID';"
          sleep 2
        fi
      done

      echo "Importing credential: $CREDENTIAL"
      n8n import:credentials --input="$temp_file"
    fi
  done
  echo "All credentials imported/replaced!"
else
  echo "No credentials folder found. Skipping credential import."
fi


# Keep the container running
wait
