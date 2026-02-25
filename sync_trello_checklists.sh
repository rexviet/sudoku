#!/bin/bash

BOARD_ID="699d5fafc27cc0c519a53dcb"
KEY="${TRELLO_API_KEY}"
TOKEN="${TRELLO_TOKEN}"
BASE_DIR="/Users/macbook/Data/Projects/sudoku/user-stories"

# Get all cards on board
cards=$(curl -s "https://api.trello.com/1/boards/$BOARD_ID/cards?key=$KEY&token=$TOKEN" | jq -c '.[] | {id: .id, name: .name}')

echo "$cards" | while read -r card; do
    card_id=$(echo "$card" | jq -r '.id')
    card_name=$(echo "$card" | jq -r '.name')
    
    echo "Processing Card: $card_name ($card_id)"
    
    # Find the file that matches this card name (first line of the file)
    file_path=$(grep -lR "# $card_name" "$BASE_DIR" | grep ".md$" | head -n 1)
    
    if [ -n "$file_path" ]; then
        echo "Found file: $file_path"
        
        # 1. Create "Tasks" Checklist
        checklist_tasks_id=$(curl -s -X POST "https://api.trello.com/1/checklists?idCard=$card_id&name=Tasks&key=$KEY&token=$TOKEN" | jq -r '.id')
        
        # Extract and add Tasks
        sed -n '/## Tasks/,/##/p' "$file_path" | grep "^- \[ \]" | while read -r line; do
            task_name=$(echo "$line" | sed 's/- \[ \] //')
            curl -s -X POST "https://api.trello.com/1/checklists/$checklist_tasks_id/checkItems?name=$(echo "$task_name" | jq -sRr @uri)&key=$KEY&token=$TOKEN" > /dev/null
        done
        
        # 2. Create "Acceptance Criteria" Checklist
        checklist_ac_id=$(curl -s -X POST "https://api.trello.com/1/checklists?idCard=$card_id&name=Acceptance%20Criteria&key=$KEY&token=$TOKEN" | jq -r '.id')
        
        # Extract and add ACs
        sed -n '/## Acceptance Criteria/,/##/p' "$file_path" | grep "^- \[ \]" | while read -r line; do
            ac_name=$(echo "$line" | sed 's/- \[ \] //')
            curl -s -X POST "https://api.trello.com/1/checklists/$checklist_ac_id/checkItems?name=$(echo "$ac_name" | jq -sRr @uri)&key=$KEY&token=$TOKEN" > /dev/null
        done
        
        echo "  Created checklists for $card_name"
    else
        echo "  No matching local file found for $card_name"
    fi
done
