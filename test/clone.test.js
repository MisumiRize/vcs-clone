import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import assert from 'power-assert'

import { default as clone } from '../lib/clone'

const REPOSITORY_PATH = 'github.com/MisumiRize/vcs-clone'
const DESTINATION_PATH = `${__dirname}/.tmp/github.com/MisumiRize/vcs-clone`

function fail() {
  throw new Error('Promise is expected to be rejected but it was fulfilled')
}

describe('clone', () => {

  beforeEach(() => {
    fs.mkdirSync(`${__dirname}/.tmp`)
  })

  afterEach(() => {
    rimraf.sync(`${__dirname}/.tmp`)
  })

  it('should spawn VCS command', () => {
    return clone(REPOSITORY_PATH, `${__dirname}/.tmp`)
  })

  it('should throw an error when destination directory exists', () => {
    mkdirp.sync(DESTINATION_PATH)
    return clone(REPOSITORY_PATH, `${__dirname}/.tmp`)
      .then(fail)
      .catch((err) => {
        assert.equal(err, `Destination directory ${DESTINATION_PATH} exists`)
      })
  })

  it('should spawn VCS command when update is enabled and destination directory exists', () => {
    mkdirp.sync(DESTINATION_PATH)
    return clone(REPOSITORY_PATH, `${__dirname}/.tmp`, { update: true })
  })
})
