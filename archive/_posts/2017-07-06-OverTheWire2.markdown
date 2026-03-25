---
layout: post
title:  "OVER THE WIRE - 2"
date:   2017-07-06 00:06:16 +0530
categories: technology security
summary: "Solutions to 'Over The Wire' exersizes on Network Security (Levels 21-)"
---

#### baby steps to netsec - part II

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

A look at cronjob_bandit22 tells us what script is run :  `/usr/bin/cronjob_bandit23.sh`
And a look at the script lets us know that a folder name is created using the following command :
` echo I am user bandit22 | md5sum | cut -d ' ' -f 1` I would be advisable to learn about each of the piped commands, for the impatient ... it prints : `8169b67bd894ddbb4412f91573b38db3` now go figure !

As per script the password is moved to `/tmp/8169b67bd894ddbb4412f91573b38db3` I cant seem to find it :-(s

## BANDIT 23 | ???s
