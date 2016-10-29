# license-list

`license-list` is the helper library for making a list of package's LICENSE information, inspired by [license-checker](https://github.com/davglass/license-checker/) and [licensify](https://github.com/twada/licensify).

[![Build Status](https://travis-ci.org/yami-beta/license-list.svg?branch=master)](https://travis-ci.org/yami-beta/license-list)
[![npm version](https://badge.fury.io/js/license-list.svg)](https://badge.fury.io/js/license-list)

```sh
$ npm install --save-dev license-list
```

## API

`import licenseList from 'license-list';`

### `licenseList(basePath [, opts])`

- `basePath`: String
    - Specifying path of `package.json`
    - In case of `package.json` in current directory, use `licenseList('.')`
- `opts`: Object
    - `opts.dev`: Boolean
        - When `opts.dev` is true, *devDependencies* are included

### Example

```javascript
import licenseList from 'license-list';

licenseList('.', { dev: false }).then((packages) => {
  const pkgInfo = packages['license-list@0.1.0'];
  console.log(pkgInfo);
});
```

For more details, see [test/license-list.js](https://github.com/yami-beta/license-list/blob/master/test/license-list.js).

## CLI

```sh
$ license-list .
license-list@0.1.0 (MIT)

  MIT License

  Copyright (c) 2016 yami_beta

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


glob@7.1.0 (ISC)
(...)
```

### Options

- `-d, --dev`
    - Listing LICENSE information with devDependencies

# LICENSE

MIT
