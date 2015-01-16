#!/bin/bash

# Souce NVM and run `npm start`
# source nvm because .bashrc does nothing when loaded non-interactively
#source /home/vagrant/.nvm/nvm.sh
#cd /home/vagrant/clientapp/
#
## IF Logging is set on, don't run in background
#if [[ $(cat .env | grep -c GULP_LOG_TO_CONSOLE=TRUE) > 0 ]]; then
#  echo "would start npm"
##  npm start
#else
#  echo "would start npm"
##  nohup npm start &
#fi

# TODO REMOVE HARDCODE PATH
if [[ $(cat /home/vagrant/clientapp/.env | grep -c VAGRANT_RUN_GULP_ON_START=TRUE) > 0 ]]; then
  source /home/vagrant/clientapp/helpers.sh
  start-gulp
fi
