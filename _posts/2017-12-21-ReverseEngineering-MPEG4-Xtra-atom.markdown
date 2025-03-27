---
layout: post
title:  "'Xtra' metadata MPEG4 atom"
date:   2017-12-21 00:06:16 +0530
categories: technology multimedia
summary: "Reverse Engineering the Windows MPEG4 custom 'Xtra' metadata atom"
---

# Reverse Engineering the Windows MPEG4 custom 'Xtra' metadata atom

Windows supports MPEG4 format file playback including a rich metatdata field support. Windows Explorer can deal with standard iTunes metadata, but for some extended fields like Composer, Director, EncodedBy etc it uses a non standard atom 'Xtra'. See [msdn](https://msdn.microsoft.com/en-us/library/windows/desktop/ff384862%28v=vs.85%29.aspx) for a list of Metadata  Properties for media files.

Following is a sample atom tree as visualised by [AtomicParsely|] (version 0.9). It lists Xtra but has no visibility under it.

```
Atom ftyp @ 0 of size: 24, ends @ 24
Atom mdat @ 24 of size: 10439547 (^), ends @ 0
			 (^)denotes a 64-bit atom length
Atom moov @ 10439571 of size: 3700, ends @ 10443271
     Atom mvhd @ 10439579 of size: 108, ends @ 10439687
     Atom trak @ 10439687 of size: 1804, ends @ 10441491
         Atom tkhd @ 10439695 of size: 92, ends @ 10439787
         Atom mdia @ 10439787 of size: 1704, ends @ 10441491
             Atom mdhd @ 10439795 of size: 32, ends @ 10439827
             Atom hdlr @ 10439827 of size: 44, ends @ 10439871
             Atom minf @ 10439871 of size: 1620, ends @ 10441491
                 Atom vmhd @ 10439879 of size: 20, ends @ 10439899
                 Atom dinf @ 10439899 of size: 36, ends @ 10439935
                     Atom dref @ 10439907 of size: 28, ends @ 10439935
                 Atom stbl @ 10439935 of size: 1556, ends @ 10441491
                     Atom stsd @ 10439943 of size: 168, ends @ 10440111
                         Atom avc1 @ 10439959 of size: 152, ends @ 10440111
                             Atom avcC @ 10440045 of size: 50, ends @ 10440095
                             Atom pasp @ 10440095 of size: 16, ends @ 10440111			 ~
                     Atom stts @ 10440111 of size: 520, ends @ 10440631
                     Atom stss @ 10440631 of size: 40, ends @ 10440671
                     Atom stsz @ 10440671 of size: 728, ends @ 10441399
                     Atom stsc @ 10441399 of size: 52, ends @ 10441451
                     Atom co64 @ 10441451 of size: 40, ends @ 10441491
     Atom trak @ 10441491 of size: 1585, ends @ 10443076
         Atom tkhd @ 10441499 of size: 92, ends @ 10441591
         Atom mdia @ 10441591 of size: 1455, ends @ 10443046
             Atom mdhd @ 10441599 of size: 32, ends @ 10441631
             Atom hdlr @ 10441631 of size: 44, ends @ 10441675
             Atom minf @ 10441675 of size: 1371, ends @ 10443046
                 Atom smhd @ 10441683 of size: 16, ends @ 10441699
                 Atom dinf @ 10441699 of size: 36, ends @ 10441735
                     Atom dref @ 10441707 of size: 28, ends @ 10441735
                 Atom stbl @ 10441735 of size: 1311, ends @ 10443046
                     Atom stsd @ 10441743 of size: 91, ends @ 10441834
                         Atom mp4a @ 10441759 of size: 75, ends @ 10441834
                             Atom esds @ 10441795 of size: 39, ends @ 10441834
                     Atom stts @ 10441834 of size: 568, ends @ 10442402
                     Atom stsz @ 10442402 of size: 552, ends @ 10442954
                     Atom stsc @ 10442954 of size: 52, ends @ 10443006
                     Atom co64 @ 10443006 of size: 40, ends @ 10443046
         Atom udta @ 10443046 of size: 30, ends @ 10443076
             Atom name @ 10443054 of size: 22, ends @ 10443076
     Atom udta @ 10443076 of size: 195, ends @ 10443271
         Atom meta @ 10443084 of size: 80, ends @ 10443164
             Atom hdlr @ 10443096 of size: 32, ends @ 10443128
             Atom ilst @ 10443128 of size: 36, ends @ 10443164
                 Atom ©day @ 10443136 of size: 28, ends @ 10443164
                     Atom data @ 10443144 of size: 20, ends @ 10443164
                     Atom Xtra @ 10443164 of size: 107, ends @ 10443271 ~

 ~ denotes an unknown atom
------------------------------------------------------
Total size: 10443271 bytes; 48 atoms total. AtomicParsley version: 0.9.0 (utf16)
Media data: 10439547 bytes; 3724 bytes all other atoms (0.036% atom overhead).
Total free atom space: 0 bytes; 0.000% waste.
------------------------------------------------------
```

Lets break down the 107 byte magic which happens to appear at the bottom of the file :

```
            00 00 00 6B 58 74 72 61 00 00 00 29
00 00 00 0F 57 4D 2F 45 6E 63 6F 64 69 6E 67 54
69 6D 65 00 00 00 01 00 00 00 0E 00 15 40 B4 8C
EF 22 7E D3 01 00 00 00 3A 00 00 00 0C 57 4D 2F
45 6E 63 6F 64 65 64 42 79 00 00 00 01 00 00 00
22 00 08 47 00 65 00 46 00 6F 00 72 00 63 00 65
00 20 00 53 00 48 00 41 00 52 00 45 00 00 00
```

corresponds to plaintext :

```
    ...kXtra...)
....WM/EncodingT
ime..........@´Œ
ï"~Ó....:....WM/
EncodedBy.......
"..G.e.F.o.r.c.e
. .S.H.A.R.E...
```

Neat. Lets dig deeper.

**```00 00 00 6B```** corresponds to 107 bytes that is the size of the atom (including 4 bytes for itself).

**```58 74 72 61```** is the atom name 'Xtra' is  plaintext.

**```00 00 00 29```** looks like size of a container. Lets analyze the following 0x29 bytes.

**```00 00 00 0F```** Analysing the next 0x29 bytes we see a blob that seems to start with 4 byte magical 0xF. Its size as next 0xF bytes ends immediately after the plaintext string "WM/EncodedBy". Funny that the atom size just accounts for itself and the atom name. I assume the Windows  parser knows what to make off the following bytes depedning on pseudo-atom name. Not fair !

**```WM/EncodingTime```** looks like the name of a pseudo-atom, unconventional since atoms are usually 4 bytes.

**```00 00 00 01 - 00 00 00 0E - 00 15 40 B4 - 8C EF 22 7E - D3 01 00 00 - 00 3A 00 00 - 00 0C```** looks like the content for pseudo-atom WM/EncodingTime in which case it would correspond to **```12/26/2017 1.54PM```**. Still figuruing out the datatype.

**```57 4D 2F 45 - 6E 63 6F 64 - 65 64 42 79```** is WM/EncodedBy in plaintext. another pseudo-atom ?

**```00 00 00 01```** Witchcraft ! ```¯\_(ツ)_/¯``` If its size, it just accounts for itself ! As useful as a boolean to store a string.

**```00 00 00 22```** seems like size of following content (which happens to be the last item so it covers all bytes uptill the end of file.

**```00 08```** two bytes for God knows what.

**```47 00 65 00 - 46 00 6F 00 - 72 00 63 00 - 65 00 20 00 - 53 00 48 00 - 41 00 52 00 - 45 00 00 00```** corresponds to UTF-16 plaintext '*GeForce SHARE*'.

I will dig into other metadata which might help throw light on more of the metadata types, here i just sampled two that get automatically written when capturing videos using GeForce Experience's Share feature.
