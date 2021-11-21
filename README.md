# Ciphering CLI Tool (task 1)

## Getting started:
1. clone this repo
2. do not forget change directory on your terminal

## Usage
to run the application
use the command `node index.js` from project folder.

### Options
 **-c, --config**: config for ciphers  
 **-i, --input**: a path to input file  
 **-o, --output**: a path to output file  
 ***other parameters will be ignored***
 #### Details:
 Config is a string with pattern `{XY(-)}n`, where:
  * `X` is a cipher mark:
    * `C` is for Caesar cipher (with shift 1)
    * `A` is for Atbash cipher
    * `R` is for ROT-8 cipher
  * `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    * `1` is for encoding
    * `0` is for decoding

**Usage examples**

```bash
$ node index.js -c "C1-C1-R0-A" -i "./data/input.txt" -o "./data/output.txt"
```
```bash
$ node index.js -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./data/input.txt" -o "./data/output.txt"
```