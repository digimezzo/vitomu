![Vitomu](Vitomu.full.png)

# Vitomu
Vitomu stands for **VI**deo **TO** **MU**sic converter. It allows easy conversion of online and offline videos to audio files. Just drop a URL or a local video file on the target to start the conversion. The current version supports dropping URL's of Youtube videos, and dropping of local MKV and MP4 files.

[![Release](https://img.shields.io/github/release/digimezzo/vitomu.svg?style=flat-square&include_prereleases)](https://github.com/digimezzo/vitomu/releases/latest)
[![Issues](https://img.shields.io/github/issues/digimezzo/vitomu.svg?style=flat-square)](https://github.com/digimezzo/vitomu/issues)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MQALEWTEZ7HX8)

## Screenshot

![Vitomu2screenshot](Vitomu.showcase.png)

## Important ##

This software uses code of <a href=http://ffmpeg.org>FFmpeg</a> licensed under the <a href=http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html>LGPLv2.1</a> and its source can be downloaded <a href="https://github.com/FFmpeg/FFmpeg">here</a>

## Build instructions

```bash
$ git clone https://github.com/digimezzo/vitomu.git
$ cd vitomu
$ npm install            # Download dependencies
$ npm start              # Start Vitomu
$ npm run electron:windows   # Build for Windows
$ npm run electron:linux     # Build for Linux
$ npm run electron:mac       # Build for Mac
