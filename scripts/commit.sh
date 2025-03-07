#!/bin/sh

echo "Running commit..."

#Export workflows
docker exec -t jira_issues_n8n n8n export:workflow --backup --output=/home/node/.n8n/workflows;

git add -A && git commit -m "$1"

echo "Commit completed successfully."
exit 0