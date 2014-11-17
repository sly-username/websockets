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

# add some stuff to .profile
echo "" >> ~/.profile
echo "# Added during provision" >> ~/.profile
echo "source ~/clientapp/helpers.sh" >> ~/.profile

# install gulp, bower, karma globally
# TODO Remove?
#npm install -g gulp bower karma-cli less traceur npm-check-updates

# Create clientapp for prosperty
if [ ! -d "/home/vagrant/clientapp" ]; then
  mkdir /home/vagrant/clientapp
fi

# Create logs folder if needed
if [ ! -d "/home/vagrant/clientapp/logs" ]; then
  mkdir /home/vagrant/clientapp/logs
fi

# Create logs/gulp folder if needed
if [ ! -d "/home/vagrant/clientapp/logs/gulp" ]; then
  mkdir /home/vagrant/clientapp/logs/gulp
fi

# Set up node_modules if not already set up
if [ ! -d "~/clientapp/node_modules" ]; then
  echo "npm install deps for clientapp"
  cd ~/clientapp/
  npm install
fi

