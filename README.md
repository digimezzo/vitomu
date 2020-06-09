![Vitomu](Vitomu.logo.full.png)

# Vitomu
Vitomu stands for **VI**deo **TO** **MU**sic converter. It allows easy conversion of online and offline videos to audio files. Just drop a URL or a local video file on the target to start the conversion. The current version supports dropping URL's of Youtube videos, and dropping of local MKV and MP4 files.

<a href='https://ko-fi.com/S6S11K63U' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi1.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/vitomu)

[![Release](https://img.shields.io/github/release/digimezzo/vitomu.svg?style=flat-square&include_prereleases)](https://github.com/digimezzo/vitomu/releases/latest)
[![Issues](https://img.shields.io/github/issues/digimezzo/vitomu.svg?style=flat-square)](https://github.com/digimezzo/vitomu/issues)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MQALEWTEZ7HX8)

<a href='https://ko-fi.com/S6S11K63U' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi1.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## Screenshot

![Vitomu2screenshot](Vitomu.showcase.png)

## Important ##

This software uses code of <a href=http://ffmpeg.org>FFmpeg</a> licensed under the <a href=http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html>LGPLv2.1</a> and its source can be downloaded <a href="https://github.com/FFmpeg/FFmpeg">here</a>

## Build prerequisites

- wine: required to build Windows package
- rpm: required to build rpm package
- libarchive-tools: contains bsdtar, which is required to build pacman package.

**To install the prerequisites on Ubuntu:**

sudo apt install wine rpm libarchive-tools

## Build instructions

```bash
$ git clone https://github.com/digimezzo/vitomu.git
$ cd vitomu
$ npm install            # Download dependencies
$ npm start              # Start Vitomu
$ npm run electron:windows   # Build for Windows
$ npm run electron:linux     # Build for Linux
$ npm run electron:mac       # Build for Mac

## Pacman installation notes

The pacman package contains a dependency to package libappindicator-sharp, which is no longer distributed with Arch Linux. I cannot remove this dependency for now, because it is an issue in electron-builder (the packaging tool which is used in this project). It is, however, possible to install Vitomu on Arch Linux or Manjaro using this command (replace x.y.z with the correct version number): 

`$ sudo pacman -U Vitomu-x.y.z.pacman --assume-installed libappindicator-sharp`