#!/bin/bash

# must be run inside of vagrant

# see gulp server procs in vagrant
proc-gulp ()
{
  ps ux | awk '!/awk|bash/ && /npm|node|gulp/ {print}'
}

# this will kill all the procs running the gulp dev server
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
