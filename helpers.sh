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
    command -v npm >/dev/null 2>&1 || echo "sourcing nvm" ; source ~/.nvm/nvm.sh
    local CWD=`pwd`
    cd ~/clientapp/
    npm start
    cd $CWD
  fi
  proc-gulp
}
