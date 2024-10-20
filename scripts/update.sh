#!/bin/bash
# pull all remote changes
git pull

# Add all files to the staging area
git add .

# Commit the changes with a message
git commit -m "update docs"

# Push the changes to the remote repository
git push