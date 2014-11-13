#!/bin/bash

# install and load nvm
curl https://raw.githubusercontent.com/creationix/nvm/v0.18.0/install.sh > ~/install.nvm.sh
chmod +x ~/install.nvm.sh
. ~/install.nvm.sh
rm ~/install.nvm.sh
source ~/.nvm/nvm.sh ; echo "installed nvm"

# install node 0.11 via nvm
nvm install 0.11

# install set 0.11 as default for system in nvm
nvm alias default 0.11

# install gulp, bower, karma globally
#npm install -g gulp bower karma-cli less traceur npm-check-updates

if [ ! -d "~/clientapp/node_modules" ]; then
  echo "npm install deps for clientapp"
  cd ~/clientapp/
  npm install
fi

