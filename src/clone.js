import url from 'url'
import path from 'path'
import fs from 'fs'
import childProcess from 'child_process'
import mkdirp from 'mkdirp'
import co from 'co'

import { default as Repository } from './Repository'
import { ensure } from './spawn'
import { instance as DefaultVCSDetectionStrategy } from './DefaultVCSDetectionStrategy'

let debug = require('debug')('vcs-clone')

const HAS_SCHEME_PATTERN = /^[^:]+:\/\//

function parse(argUrl) {
  let fullUrl = (HAS_SCHEME_PATTERN.test(argUrl)) ? argUrl : `https://${argUrl}`
  return url.parse(fullUrl)
}

function exists(localPath) {
  return new Promise(resolve => {
    fs.open(localPath, 'r', err => {
      resolve((err && err.code == 'ENOENT') ? false : true)
    })
  })
}

function createDir(dirPath) {
  return new Promise((resolve, reject) => {
    mkdirp(dirPath, err => {
      (err) ? reject(err) : resolve()
    })
  })
}

export default function clone(argUrl, root, options = {}) {
  return co(function*() {
    let parsedUrl = parse(argUrl)

    if (!parsedUrl.host) {
      throw 'Invalid URL given'
    }

    let repository = new Repository(parsedUrl, root)
    debug(`${parsedUrl.href} -> ${repository.getLocalPath()}`)

    let exist = yield exists(repository.getLocalPath())
    if (exist && !options.update) {
      throw `Destination directory ${repository.getLocalPath()} exists`
    }

    let vcs = yield DefaultVCSDetectionStrategy.detectVCS(repository)
    if (!vcs) {
      throw 'No VCS detected'
    }

    if (exist) {
      yield ensure(`${vcs.name}:update`, vcs.getUpdateCommand(options), {cwd: repository.getLocalPath()})
    } else {
      yield createDir(path.dirname(repository.getLocalPath()))
      yield ensure(`${vcs.name}:clone`, vcs.getCloneCommand(options))
    }

    return vcs
  })
}
