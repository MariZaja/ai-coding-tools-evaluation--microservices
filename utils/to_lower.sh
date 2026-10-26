#!/bin/bash

# Directory containing JSON files
DATA_DIR="categories_merge"

# Convert each file name in the data directory to lowercase
for FILE in "$DATA_DIR"/*.json; do
  # Get the lowercase version of the filename
  LOWERCASE_FILE=$(echo "$FILE" | tr '[:upper:]' '[:lower:]')

  # Rename the file if the lowercase name is different
  if [[ "$FILE" != "$LOWERCASE_FILE" ]]; then
    mv "$FILE" "$LOWERCASE_FILE"
    echo "Renamed $FILE to $LOWERCASE_FILE"
  fi
done

# Continue with the rest of your processing script if needed
echo "All files renamed to lowercase in $DATA_DIR."
