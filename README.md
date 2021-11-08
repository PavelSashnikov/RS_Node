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
$ node my_ciphering_cli -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./data/input.txt" -o "./data/output.txt"
```


___

## Fulfilled Requirements
**Базовая реализация**

1. В `README.md` должно быть описано, как можно запустить программу из командной строки, описаны аргументы, которые можно передать приложению **плюс 10 баллов**.
2. Если переданы все аргументы и они корректны, приложение читает из файла и записывает в файл преобразованный текст, при этом предыдущие записи не удаляются **плюс 20 баллов**
3. Приложение работает в соответствии с описанными в задании примерами **плюс 30 баллов**
4. Если аргументы `input` и/или `output` ведут к несуществующему файлу либо директории,приложение передает соответствующее сообщение в `process.stderr` и прoцесс завершается с кодом, отличным от 0 **плюс 10 баллов**
5. Если любой из аргументов дублируется, приложение передает соответствующее сообщение в `process.stderr` и прoцесс завершается с кодом, отличным от 0 **плюс 10 баллов**
6. Если `config` невалиден или отсутствует, приложение передает соответствующее сообщение в `process.stderr` и прoцесс завершается с кодом, отличным от 0 **плюс 20 баллов**.
Объем валидации `config`:
    * проверяется, что `config` имеет формат `{XY(-)}n`
    * проверяется, что `X` соответствует одному из шифров
    * проверяется, что для ROT-8 и Цезаря присутствует элемент `Y`
    * проверяется, что для Атбаш отсутствует элемент `Y`
    * проверяется, что `Y` — это 1 или 0
7. Если не передан аргумент с путем до файла на чтение, то чтение осуществляется из `process.stdin` **плюс 10 баллов**
8. Если не передан аргумент с путем до файла на запись, то вывод осуществляется в `process.stdout` **плюс 10 баллов**
9. Шифруются/дешифруются только латинские буквы, регистр сохраняется, остальные символы не изменяются **плюс 20 баллов**
10. Если текст вводится из консоли, то программа не должна завершаться после выполнения шифровки/дешифровки введенного текста, т.е. должна быть возможность ввести еще текст **плюс 10 баллов**
11. Кодовая база не находится в одном файле, а разделена на файлы в соответствии с выполняемыми задачами (например - функция, преобразующая строку, в отдельном файле, код, создающий transform стрим, в отдельном файле, функция для парсинга и валидации аргументов в отдельном файле и т.п.) **плюс 10 баллов**

**Продвинутая реализация**
1. Чтение реализовано при помощи кастомного стрима (класс, отнаследованный от Readable) **плюс 10 баллов**
2. Запись реализована при помощи кастомного стрима (класс, отнаследованный от Writable) **плюс 10 баллов**
3. Для передачи сообщения в `process.stderr` используются `пользовательские ошибки` и их обработка **плюс 10 баллов**  
*Good Luck :)*