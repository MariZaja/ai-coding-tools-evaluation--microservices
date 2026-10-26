#!/bin/bash

# Function to check if PostgreSQL is running
wait_for_postgres() {
  until psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q' 2>/dev/null; do
    >&2 echo "Postgres is unavailable - sleeping"
    sleep 1
  done
}

# Function to escape single quotes for SQL
escape_string() {
  echo "$1" | sed "s/'/''/g"
}

# Function to insert data into the species table
insert_species_data() {
  local file=("vegetables")
  # "herbs")
  
  for JSON_FILE in "$SPECIES_DIR"/*.json; do
        cat "$JSON_FILE" | jq -c ".[]" | while read -r item; do
        Name=$(escape_string "$(echo "$item" | jq -r '.common_name')")
        Description=$(escape_string "$(echo "$item" | jq -r '.description')")
        Maintenance=$(escape_string "$(echo "$item" | jq -r '.maintenance')")
        Watering=$(escape_string "$(echo "$item" | jq -r '.watering')")
        Size=$(escape_string "$(echo "$item" | jq -r '.dimension')")
        Poisonous=$(escape_string "$(echo "$item" | jq -r '.poisonous_to_humans')")
#        Default_image=$(escape_string "$(echo "$item" | jq -r '.default_image.original_url')")
        Sunlight=$(escape_string "$(echo "$item" | jq -r '.sunlight | join(", ")')")
        Edible_parts=$(escape_string "$(echo "$item" | jq -r '.edible_fruit')")
        Type=$(escape_string "$(echo "$item" | jq -r '.type')")
        Id=$(echo "$item" | jq -r '.id')

        IMAGE_PATH="$SPECIES_DIR/images/${Id}_image.jpg"
        IMAGE_DATA=$(cat "$IMAGE_PATH" | base64)

      # Insert the data into the PostgreSQL database
      psql -U gardenGenius -d gardenGeniusDb -c "
        INSERT INTO species (name, description, maintenance, watering, size, poisonous, default_image, sunlight, edible_parts, type)
        VALUES ('$Name', '$Description', '$Maintenance', '$Watering', '$Size', '$Poisonous', '$IMAGE_DATA', '$Sunlight', '$Edible_parts', '$Type');
      "
    done
  done
}

# Function to insert data into the users table
insert_users_data() {
  cat "$USERS_DATA" | jq -c '.users[]' | while read -r user; do
    local Username=$(escape_string "$(echo "$user" | jq -r '.Username')")
    local Password=$(escape_string "$(echo "$user" | jq -r '.Password')")
    local Email=$(escape_string "$(echo "$user" | jq -r '.Email')")

    # Insert the data into the PostgreSQL database
    psql -U gardenGenius -d gardenGeniusDb -c "
      INSERT INTO users (username, password, email)
      VALUES ('$Username', '$Password', '$Email');
    "
  done
}

insert_gardens_data() {
  cat "$GARDENS_DATA" | jq -c '.gardens[]' | while read -r garden; do
    local User_id=$(escape_string "$(echo "$garden" | jq -r '.User_id')")
    local Name=$(escape_string "$(echo "$garden" | jq -r '.Name')")
    local Creation_date=$(escape_string "$(echo "$garden" | jq -r '.Creation_date')")
    local Surrounding=$(escape_string "$(echo "$garden" | jq -r '.Surrounding')")
    
    # Insert the data into the PostgreSQL database
    psql -U gardenGenius -d gardenGeniusDb -c "
      INSERT INTO gardens (user_id, name, creation_date, surrounding)
      VALUES ('$User_id', '$Name', '$Creation_date', '$Surrounding');
    "
  done
}

# Main script execution
SPECIES_DIR="./data/species"
USERS_DATA="/data/users.json"
GARDENS_DATA="/data/gardens.json"

# Wait for PostgreSQL to start
wait_for_postgres

# Insert species data (vegetables and herbs)
insert_species_data

# Insert users data
insert_users_data

# Insert gardens data
insert_gardens_data