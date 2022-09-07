---
layout: post
title:  "OVER THE WIRE"
date:   2017-06-07 00:06:16 +0530
categories: technology security
summary: "Solutions to 'Over The Wire' exersizes on Network Security (Levels 1-20)"
---

#### baby steps to netsec

## Wargame BANDIT
##### SSH : `bandit.labs.overthewire.org:2220`

### Level 1 to 20

The wargames offered by the OverTheWire community can help you to learn and practice security concepts in the form of fun-filled games. I highly recommend it for every one to have a look at their awesome [website](http://overthewire.org/wargames). Here is my effort on the first and simplest Wargame listed : [Bandit](http://overthewire.org/wargames/bandit/bandit1.html). I have summarised a list of concepts learned in each Level of the game.

## Bandit0 | Bandit0
file readme has password for Bandit1 : `boJ9jbbUNNfktd78OOpsqOltutMc3MY1`

##### *Commands learned*
`
use \>man [COMMAND] to get help on the command and if that fails use \>help [COMMAND]
`

| COMMAND | Description | Usage Example |
| ------- | ----------- | ------------- |
|`ls`|list directory contents|ls|
|`cd`|Change the shell working directory|cd|
|`cat`|concatenate files and print on the standard output|cat [FILENAME]|
|`file`|determine file type|file [FILENAME]|
|`du`|estimate file space disk usage|du|
|`find`|search for files in a directory hierarchy|find [FILENAME]|

## BANDIT1 | boJ9jbbUNNfktd78OOpsqOltutMc3MY1
##### Accessing files named with just a hyphen
task is to read a file convinientsly named with just a hyphen `-`
The problem now is that most commands accept arguments prefixed with a hyphen and `cat`
will have issues parsing just a stand alone hyphen.
I tried using a common trick of enclosing the hyphen in quotes but `"-"` did
not seem to do the trick either.
So now I used an expression i have often seen in many scripts,
where a executable in the current directory is referred to as `./filename`
so I use `cat ./-` to successfully get password to the next level : `CV1DtqXWVFXTvM2F0k09SHz0YwRINYA9`

## BANDIT2 | CV1DtqXWVFXTvM2F0k09SHz0YwRINYA9
##### Accessing files with spaces in its name
Remember how in the previous level i tried enclosing the filename with quotes, yup that worked in this level.
Ran `cat "file name with spaces"` to get password for next level `UmHadQclWmgdLOKQ3YNgjWxGoRMb5luK`

## BANDIT3 | UmHadQclWmgdLOKQ3YNgjWxGoRMb5luK
##### Accessing hidden files
there is a .hidden file not visible on a simple `ls` so go for the pro version and use : `ls -a`
or even better `ls -l -a` to see it has access specified as : `-rw-r-----`
A hidden file is anything beginning with a `.` but I used this excersize to explore file permissions.

![File Permissions in Linux](http://linuxcommand.org/images/permissions_diagram.gif)

[more info on users and groups](https://wiki.archlinux.org/index.php/users_and_groups)

`cat .hidden` gives `pIwrPrtPN36QITSp3EQaw936yaFoFgAB`

ta-da !

## BANDIT4 | pIwrPrtPN36QITSp3EQaw936yaFoFgAB

Has a folder called `readme` with 10 file from `-file00` to `-file09`
yup, the names start with a hyphen, how convinient. Use `cat ./-*` to see all at once.
`-file07` has qwhat looks like a password. Rest of them contain non-ascii stuff, not sure if they can be used as passwords.
MSDN [recommends sing Unicode Characters in ALT Key Combinations](https://msdn.microsoft.com/en-us/library/cc875839.aspx)

## BANDIT5 | koReBOKuIDDepwhWk7jZC0RTdopnAYKh
Has a list of 20 folders `maybehere00` to `maybehere19` with files in it with spaces in its name as well as with hyphen and dot prefix.
Of course you can search one by one, its only 20 folders, but that is not the reason you started this, did you ?
So how do we iterrate over the folders in root directory and see content of all its files (with unconventional yet valid names).
The problem lists three unique features about the file :

1. human-readable
2. 1033 bytes in size
3. not executable

Almost all are human readable you will notice so thats not really helpful.
Size is 1033 bytes exact, thats a very strong hint.

Use command `du -a` to see size of all files in all folders. But size isn't in bytes, for that use additional `-b` argument.
Voila ! .file2 in maybehere07 is seen of size 1033 in plain sight ! A lot of empty space is trailing the actual password so that
had the size not be mentioned you could have isolated this one file just by its abnosrmal small size (rest are quite bigger!).
But this was a very poor solution, there is obviously a more sophisticated way of solving this that helps you not
manually parse a long list for the number 1033. `find` is the command to use here.

`find -size 1033c` quickly returns `./maybehere07/.file2` which hass password `DXjZPULLxYr17uwoI01bNLQbtFemEgo7`

## BANDIT6 | DXjZPULLxYr17uwoI01bNLQbtFemEgo7
Okay this got me stumped for sometime. The folder where you spawn has nothing worthwhile in it. The total size of the folder is less than the password file size (33bytes)
so naturally, I drift to the root. and the command for previous level does equally well, I do add an additional `-user` and `-group` arguments.
On execution of `find -size 33c -user bandit7 -group bandit6` most opf the files are denied permission but this one caught my eye :
`./var/lib/dpkg/info/bandit7.password`, yup and the password works for bandit7 !

## BANDIT7 | HKBPTKQnIay4Fw76bEy8PVxKEDQRKTzs
Ah ! the famous `grep`. This level needs you to parse data.txt file for the work "millionth" for the password to the next level.
The solution is too simple so explore this level experimenting and learning about grep. Its quite powerful.

## BANDIT8 | cvX2JJa4CFALtqS87jk27qwqGhBM9plV
At this point I noticed that the level description wishes you to familiarize your self with the following commands :

| COMMAND | Description | Usage Example |
| ------- | ----------- | ------------- |
|`grep`|grep, egrep, fgrep, rgrep - print lines matching a pattern|`grep [OPTIONS] PATTERN [FILE...]`|
|`sort`|sort lines of text files|`sort [OPTION]... [FILE]...`|
|`uniq`|report or omit repeated lines|`uniq [OPTION]... [INPUT [OUTPUT]]`|
|`strings`|print the strings of printable characters in files.|`strings filename`|
|`base64`| base64 encode/decode data and print to standard output|` base64 [OPTION]... [FILE]`|
|`tr`|translate or delete characters|`tr [OPTION]... SET1 [SET2]`|
|`tar`|The GNU version of the tar archiving utility|`tar --extract --get [options] [pathname ...]`|
|`gzip`| gzip, gunzip, zcat - compress or expand files| `gzip [ -acdfhklLnNrtvV19 ] [--rsyncable] [-S suffix] [ name ...  ]`|
|`bzip2`|a block-sorting file compressor, v1.0.6| ... |
|`bzcat`|decompresses files to stdout|...|
|`bzip2recover`|recovers data from damaged bzip2 files|...|
|`xxd`|make a hexdump or do the reverse|`xxd [options] [infile [outfile]]`|

`uniq` lookes like a tempting option, but neither `-c` nor `-u` readily spew out any answer.
`sort` is promising but by itself alone it will leave you with manual task of seeing the password stick out out of all clubbed strings.
Why not both ? Welcome pipes `|` ... using `sort data.txt | uniq -u` does the trick (`sort data.txt | uniq -u`)

## BANDIT9 | UsvVyFSfZZWbi6wgC7dAFyFuR6jQQUhR
Much like the previous level we are to find readable "strings" where the password is prefixed with many '=' signs.
Pipes to the resque again. strings will print all readable strings and grep will find the unspecified amount of = signs for us.
`strings data.txt | grep ===` does the job and neatly prints four strings where the first three are "the", "password","is", how convinient.

## BANDIT10 | truKLdjsbJ5g7yyJ2X2R0o3a5HQJFuLk
Regarding the base64 command, this one is fairly introductory. Use `base64 -d data.txt`
Readup on base64 at [wikipedia](https://www.wikiwand.com/en/Base64) ?

## BANDIT11 | IFukwKGsFW8MOq3IRFqrxE1hxTNEbUPR
This regards the [ROT13](https://www.wikiwand.com/en/ROT13) encoding. From the translate command `tr`example on wikipedia
you know what to do : `cat data.txt | tr 'A-Za-z' 'N-ZA-Mn-za-m'`

## BANDIT12 | 5Te8Y4drgCRfCx8ugdwuEX8KFC6k2EUu
Okay, this one will make you work some, at least I did. I am not proud of my solution as it involved manual task and
the file is encrypted / tarred only a few times.
This involves introductory knowledge of `xxd`, `tar`, `gzip` and `bzip`.
The data.txt you come across is the hex dump of the original compressed binary.
use the `file` command to know what operation to do on resulting file.
If its ` gzip compressed data` use `gzip -d filename` to decompress.
If its `POSIX tar archive (GNU)` use `tar -xvf tarballname`
Occasionaly the command fails due to unrecognizable extension. so using `mv` command rename resulting file to `bz`,`gz` or `tar`

Around 8 to 9 levels deep you get an  ASCII text file with the password.

I will revisit this one to find an iterative solution, life is too small to iterate manually.
If you still see the above line promising iterative solution, I am a lazy bum and havent come back to this problem. Sorry.

## BANDIT13 | 8ZjyCRiBWFYkneahHwxCv3wb2a1ORpYL
You must familiarize yourself to these new set of commands for the next few levels :

ssh, telnet, nc, openssl, s_client, nmap
| COMMAND | Description |
| ------- | ----------- |
|`ssh`|OpenSSH SSH client (remote login program)|
|`telnet`|user interface to the TELNET protocol|
|`nc`| arbitrary TCP and UDP connections and listens|
|`openssl`|OpenSSL Commandline tool|
|`s_client`|SSL/TLS client program|
|`nmap`| Network exploration tool and security / port scanner|

In this level you just have to use the given PEN RSA Private Key file to login to the next level Bandit14.
From above description table `ssh` looks like a good candidate command to use here. Since bandit14 is local to same
system we can refer to the target as `bandit14@localhost`.
The following command logs you in automatically to the next level :
`ssh -i sshkey.private bandit14@localhost`

## BANDIT14 | SSH login using key sshkey.private | 4wcYUJFw0k0XLShlDzztnTBHiqxU3b3e
The password for the next level has to be retrieved by submitting the password of the current level to port 30000 on localhost.
Since we logged in using the private key, once we login we can see the actual password by `cat /etc/bandit_pass/bandit14`.
now nc can be used to connect to localhost:30000 . Pipe the previous cat command with `nc localhost 30000` to see password to
the next level.

## BANDIT15 | BfMYroe26WYalil77FoDi9qh59eK5xNr
Now you must submit the password of the current level to port 30001 on localhost using SSL encryption.
Again, the current password is here `/etc/bandit_pass/bandit15`. We pipe this with openssl command.
The problem also hints with the following information : *Getting “HEARTBEATING” and “Read R BLOCK”? Use -ign_eof and read the “CONNECTED COMMANDS” section in the manpage. Next to ‘R’ and ‘Q’, the ‘B’ command also works in this version of that command…*
CONNECTED COMMANDS tells us the following *If a connection is established with an SSL server then any data received from the server is displayed and any key presses will be sent to the server. When used interactively (which means neither -quiet nor -ign_eof have been given), the session will be renegotiated if the line begins with an R, and if the line begins with a Q or if end of file is reached, the connection will be closed down.*
Interesting, its worth exploring here, but finally you will conclude that the following is enough :
 `cat /etc/bandit_pass/bandit15 | openssl s_client -connect localhost:30001 -ign_eof`

## BANDIT16 | cluFn7wTiGryunymYOu4RcffSxQluehd
The Problem : The credentials for the next level can be retrieved by submitting the password of the current level to a port on localhost in the range 31000 to 32000. First find out which of these ports have a server listening on them. Then find out which of those speak SSL and which don’t. There is only 1 server that will give the next credentials, the others will simply send back to you whatever you send to it.

The wargame has reached an interesting curve and we are to get ourselves familiar with [port scanning](https://www.wikiwand.com/en/Port_scanner).

using the famous `nmap` command we wet our hands into port sniffing. Smells like hacking already, eh ? I recommend you glance over the port scanning basics [here](https://nmap.org/book/man-port-scanning-basics.html)

`nmap -sV -p 31000-32000 localhost` gets us a list of 5 ports in the required range with three that list `echo` as the service. We ignore these and pay attention to the other two ports which list ` msdtc   Microsoft Distributed Transaction Coordinator (error)` as the running service.

`echo cluFn7wTiGryunymYOu4RcffSxQluehd | openssl s_client -quiet -connect localhost:31790`
Now using the openssl s_client command on connecting to 31518 and pushing the current password, we are given a ssh private ke to login to the next level. lets save this in tmp/key/sshkey.private

Now use this key to login to level 17. Sounds familiar ? Because its same as Level 13 !
The following command ushers you into the realm of Level 17 : `ssh -i sshkey.private bandit17@localhost`

Note : Probably this command will ignore the key with error `WARNING: UNPROTECTED PRIVATE KEY FILE!`
The file must be only readable by you ! `chmod 400 sshkey.private` should take care of that.

## BANDIT17 | xLYVMN9WE5zQ5vHacb0sZEVqbrp7nBTn
The Problem : There are 2 files in the homedirectory: passwords.old and passwords.new. The password for the next level is in passwords.new and is the only line that has been changed between passwords.old and passwords.new

`diff` is listed under *Commands you may need to solve this level* and seems obvious to use here.
`diff passwords.old passwords.new`results in
`42c42
< eG69HnVwO1p7cOdfhadHkPv8Vn0ChedC
---
> kfBf3eYk5BPBRzwjqutbbfE887SVc5Yd`

so logging in into bandit18 using `kfBf3eYk5BPBRzwjqutbbfE887SVc5Yd` gets you in but immediate thrown out with a `byebye!`
Thats expected and related to the next level.

Note : to know the actual password of current level see `/etc/bandit_pass/bandit17`

## BANDIT18 | kfBf3eYk5BPBRzwjqutbbfE887SVc5Yd
The Problem : The password for the next level is stored in a file readme in the homedirectory. Unfortunately, someone has modified .bashrc to log you out when you log in with SSH.

Password is present as plaintext in readme, thats convinient. The problem is the problematic bashrc. If there was only a way from ssh to not trigger the bashrc script. A study of ssh gets us to -t : *Force pseudo-tty allocation.  This can be used to execute arbitrary screen-based programs on a remote machine, which can be very useful, e.g. when implementing menu services.  Multiple -t options force tty allocation, even if ssh has no local tty.*
Use this opportunity to learn about bash.

`ssh -t bandit18@localhost /bin/sh` gets you in safely, minus the command prompt prefix.

## BANDIT19 | IueksS7Ubh8G3DCwVzrTd8rAVOwq3M5x
The Problem : To gain access to the next level, you should use the setuid binary in the homedirectory. Execute it without arguments to find out how to use it. The password for this level can be found in the usual place (/etc/bandit_pass), after you have used the setuid binary.

setuid : short for "set user ID upon execution", read more about it [here](https://en.wikipedia.org/wiki/Setuid).

on executing the file ./bandit20-do in home folder you get :
> Run a command as another user.
>  Example: ./bandit20-do id

So thats exactly what we do, piggyback on this file to read password as another user (bandit20)
` ./bandit20-do cat /etc/bandit_pass/bandit20` gets us `GbKksEFF4yrVs6il55v6gwY5aVje5f0j`

## BANDIT20 | GbKksEFF4yrVs6il55v6gwY5aVje5f0j
The Problem : There is a setuid binary in the homedirectory that does the following: it makes a connection to localhost on the port you specify as a commandline argument. It then reads a line of text from the connection and compares it to the password in the previous level (bandit20). If the password is correct, it will transmit the password for the next level (bandit21).

NOTE: Changes to the infrastructure made this level more difficult. You will need to figure out a way to launch multiple commands in the same Docker instance.

NOTE 2: Try connecting to your own network daemon to see if it works as you think

We are now well aware og setuid binaries, in this the binary queries a port for current level's password and spits out next level's password if the password provided was correct. We first neet to setup a service at a port that repeats the levels password, for this we use `nc -l 12345 < /etc/bandit_pass/bandit20`. But wait, how do we free up the prompt for another ssh session to run the setuid binary ? For that we postfix the commandline by `&`. The command prompt appears immediately to accept the next command `./suconnect 12345` which spews out the next level's password `gE269g2h3mw3pwgrj0Ha9Uoqen1c9DGr`

I would recommend you go back at this point and revise all concepts you have learned so far in levels 1 to 20. Though a game, the point is to actually retain all the information once the game is over. Practice. Practice. Practice.

See you in next post where we wrap up the BANDIT series of OverTheWire wargames !