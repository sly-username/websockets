#!/bin/bash

# install and load nvm
if [ ! -d ~/.nvm ]; then
  curl https://raw.githubusercontent.com/creationix/nvm/v0.18.0/install.sh > ~/install.nvm.sh
  chmod +x ~/install.nvm.sh
  . ~/install.nvm.sh
  rm ~/install.nvm.sh
  source ~/.nvm/nvm.sh ; echo "installed nvm"
fi

# install node 0.11 via nvm
nvm install 0.11

# install set 0.11 as default for system in nvm
nvm alias default 0.11

# add some stuff to .profile
echo "" >> ~/.profile
echo "# Added during provision" >> ~/.profile
echo "source ~/clientapp/helpers.sh" >> ~/.profile
source ~/.profile

# install gulp, bower, karma globally
# TODO Remove?
#npm install -g gulp bower karma-cli less traceur npm-check-updates

echo "$ED_PROJECT_PATH"

# Create clientapp for prosperty
if [ ! -d "$ED_PROJECT_PATH" ]; then
  mkdir "$ED_PROJECT_PATH"
fi

# Create logs folder if needed
if [ ! -d "$ED_PROJECT_PATH/logs" ]; then
  mkdir "$ED_PROJECT_PATH/logs"
fi

# Create logs/gulp folder if needed
if [ ! -d "$ED_PROJECT_PATH/logs/gulp" ]; then
  mkdir "$ED_PROJECT_PATH/logs/gulp"
fi

# Set up node_modules if not already set up
if [ ! -d "~/clientapp/node_modules" ]; then
  echo "npm install deps for clientapp"
  cd ~/clientapp/
  npm install
fi
