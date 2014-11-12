#!/bin/bash

# install and load nvm
curl https://raw.githubusercontent.com/creationix/nvm/v0.18.0/install.sh > ~/install.nvm.sh
. ~/install.nvm.sh ; source ~/.nvm/nvm.sh ; echo "installed nvm"
rm ~/install.nvm.sh

# install node 0.11 via nvm
nvm install 0.11

# install set 0.11 as default for system in nvm
nvm alias default 0.11

# install gulp, bower, karma globally
npm install -g gulp bower karma-cli less traceur npm-check-updates

