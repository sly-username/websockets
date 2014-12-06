#!/bin/bash

# TODO When Moved to .config folder change this to be ".ed_profile" or something of the like

# Save Some Paths
ED_PROJECT_PATH="/home/vagrant/clientapp"
ED_MODULES_PATH="$ED_PROJECT_PATH/node_modules"
ED_MODULES_BIN="$ED_MODULES_PATH/.bin"

# Add Node Moduels Bin to Path
PATH="$PATH:$ED_MODULES_BIN"

# Alias gulp so that it uses harmony
alias gulp="node --harmony $ED_MODULES_PATH/gulp/bin/gulp.js"

export PATH

# Helpful Functions
# These must be run inside of vagrant
#  or via `vagrant ssh -c func-name`

# See gulp server procs in vagrant
proc-gulp ()
{
  ps ux | awk '!/awk|bash/ && /npm|node|gulp/ {print}'
}

# This will kill all the procs running the gulp dev server
kill-gulp ()
{
  local ED_GULP_PIDS=`ps axf | awk '!/awk|bash/ && /npm|node|gulp/ {printf "%s ", $1}'`
  echo "gulp pids: $ED_GULP_PIDS"

  if [ -n "$ED_GULP_PIDS" ]; then
    echo "performing kill"
    kill $ED_GULP_PIDS
    proc-gulp
  else
    echo "nothing to kill"
  fi
}

# This will run `npm start` correctly
start-gulp ()
{
  if [ -n "$(proc-gulp)" ]; then
    echo "gulp already running"
  else
    local CWD=`pwd`
    cd /home/vagrant/clientapp/
    if [[ "$NVM_DIR" == */home/vagrant/* ]]; then
      npm start
    else
      command -v npm > /dev/null 2>&1 || echo "source nvm" ; source /home/vagrant/.nvm/nvm.sh
      nohup npm start > /dev/null 2>&1 &
    fi
    cd $CWD
  fi
  proc-gulp
}

# This just runs the above two commands
restart-gulp ()
{
  kill-gulp ; start-gulp
}
