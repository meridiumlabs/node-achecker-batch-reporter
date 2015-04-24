# Batch validator for AChecker using Node.js
Generating accessibility reports using Node.js and AChecker.

## Requirements
1. You'll need to get an API key from [AChecker.ca](http://achecker.ca/) to be able to make requests.

## Usage
1. Clone the repository (i.e. `git clone ...`)
2. Register an API key for [AChecker.ca Web Service API](http://achecker.ca/register.php).
3. Replace value for API_KEY in config.js  `API_KEY : 'enter-API-key-here'`.
4. Run `npm install`
5. Define URIs to validate in config.js (`uris: [{"uri": "http://www.google.com", "uri": "http://www.apple.com"}]`
6. Run `npm start`

## Recognitions

- [https://github.com/zrrrzzt/wcag-validator](https://github.com/zrrrzzt/wcag-validator)

## License

The MIT License (MIT)

Copyright (c) 2015 Meridium

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

