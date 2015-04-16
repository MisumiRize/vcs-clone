vcs-clone
======

[![Build Status](https://travis-ci.org/MisumiRize/vcs-clone.svg?branch=master)](https://travis-ci.org/MisumiRize/vcs-clone)

An abstract VCS clone module inspired by [Golang](https://golang.org/) and [ghq](https://github.com/motemen/ghq).

Supported VCSs are:

* Git
* Mercurial
* Subversion (Optional)

## Installation

```bash
$ npm install vcs-clone
```

## Usage

### Basic

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

```
VCSClone.clone('github.com/MisumiRize/vcs-clone/', '/path/to/root', {update: true})
```
