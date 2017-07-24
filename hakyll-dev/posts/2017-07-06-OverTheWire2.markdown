# OVER THE WIRE
#### baby steps to netsec

## Wargame BANDIT
##### SSH : `bandit.labs.overthewire.org:2220`

### Level 21 to ?

## BANDIT21 | gE269g2h3mw3pwgrj0Ha9Uoqen1c9DGr
The Problem : A program is running automatically at regular intervals from cron, the time-based job scheduler. Look in /etc/cron.d/ for the configuration and see what command is being executed.

As pointed, we look into the `/etc/cron.d/' directory and find the following listed 
> cron-apt
> cronjob_bandit22
> cronjob_bandit23
> cronjob_bandit24
> php5

bandit22 is what level we wish to get to so naturally we see whats that cronjob about. It seems execute a file `/usr/bin/cronjob_bandit22.sh` every reboot that to copy the password to a file `cat /etc/bandit_pass/bandit22 > /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv`, so command ought to have been executed and file must already exist.

a quick look into this file `/tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv` gives us password to next level bandit22.

## BANDIT22 | Yk7owGAcWjwMVRwrTesJEwB7WVOiILLI

The Problem : A program is running automatically at regular intervals from cron, the time-based job scheduler. Look in `/etc/cron.d/` for the configuration and see what command is being executed.

Quite similar to what we did last time. The main problem .. i dont have time to complete this post, leaving a placeholder for now ... :-( 

