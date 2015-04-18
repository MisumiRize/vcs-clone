vcs-clone
======

[![Build Status](https://travis-ci.org/MisumiRize/vcs-clone.svg?branch=master)](https://travis-ci.org/MisumiRize/vcs-clone)

An abstract VCS clone module inspired by [Golang](https://golang.org/) and [ghq](https://github.com/motemen/ghq).

Supported VCSs are:

* Git
* Mercurial
* Subversion (Optional)

## Requirements

* Node.js (>= 0.12.0) or io.js (>= 1.0.0)

## Installation

```bash
$ npm install vcs-clone
```

## Usage

### Command Line Interface

```bash
$ vcsc github.com/MisumiRize/vcs-clone
```

### Basic

Because vcs-clone uses Generator syntax, `--harmony` option is required on Node.js.

```javascript
var VCSClone = require('vcs-clone');

VCSClone.clone('github.com/MisumiRize/vcs-clone', '/path/to/root')
  .then(function(vcs) {
    console.log(vcs);
  })
  .catch(function(err) {
    console.log(err);
  });
```

`VCSClone.clone()` returns Promise.

### Update if directory exists

```javascript
VCSClone.clone('github.com/MisumiRize/vcs-clone/', '/path/to/root', {update: true})
```
