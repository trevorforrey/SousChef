#!/bin/bash
# Release-tasks script
# Runs on heroku builds

privKey=${GOOGLE_AUTH_CONTENTS}

# Create json file and add auth contents to it
touch key.json
echo $privKey >> key.json