---
# OVER THE WIRE
# baby steps to netsec ...
---
 
The wargames offered by the OverTheWire community can help you to learn and practice security concepts in the form of fun-filled games. I highly recommend it for every one to have a look at their awesome [website](http://overthewire.org/wargames). Here is my effort on the first and simplest Wargame listed : [Bandit](http://overthewire.org/wargames/bandit/bandit1.html). I have summarised a list of concepts learned in each Level of the game.

##### SSH : `bandit.labs.overthewire.org:2220`

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