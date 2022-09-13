# Unifont2Bin
This is a tool that helps you to convert the UNIFONT to binary file.
## Dependencies:
- node (>12)
## HOW TO USE
- Open a terminal and cd to a directory.
- `git clone https://github.com/PickaxeHit/unifont2bin.git`
- `cd unifont2bin`
- Change the download pool in `main.js`.
- Run `npm install` and `node main.js`.This tool will download the lasted unifont and convert them to binary file.
- Output files are in the `out` folder.
## Explanation
1. There are 5 files in the "out" folder.
    - `unifont.bin` BMP(plane0) and SMP(plane1)
    - `unifont_jp.bin` BMP(plane0 with Japanese glyphs) and SMP(plane1)
    - `unifont_bmp.bin` BMP(plane0)
    - `unifont_bmp_jp.bin` BMP(plane0 with Japanese glyphs)
    - `unifont_smp.bin` SMP(plane1)
2. Encoding
    - All glyphs are in 32Bytes.
    - bit "1" is dot and "0" is null.
    - UNICODE coded.
    - Scanning mode: left to right, top to bottom, MSB.
        - like U+8349(草)
        ```
        04 40 04 40 FF FE 04 40
        00 00 1F F0 10 10 1F F0
        10 10 1F F0 01 00 FF FE
        01 00 01 00 01 00 01 00
        ```
        ```
        0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 //04 40
        0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 //04 40
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 //FF FE
        0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 //04 40
        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 //00 00
        0 0 0 1 1 1 1 1 1 1 1 1 0 0 0 0 //1F F0
        0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 //10 10
        0 0 0 1 1 1 1 1 1 1 1 1 0 0 0 0 //1F F0
        0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 //10 10
        0 0 0 1 1 1 1 1 1 1 1 1 0 0 0 0 //1F F0
        0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 //01 00
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 //FF FE
        0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 //01 00
        0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 //01 00
        0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 //01 00
        0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 //01 00
        ```
3. Offset:
    - First byte: unicode*32 (0x8349\*32=0x106920)
## LECENSE
- This repo is under GPL-v3
- You can use unifont by following this [LICENSE](https://unifoundry.com/LICENSE.txt)
- This tool **WON'T MODIFY** the "GNU Unifont Glyphs".