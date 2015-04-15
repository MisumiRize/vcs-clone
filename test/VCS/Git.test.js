import url from 'url'
import assert from 'power-assert'

import { default as Repository } from '../../lib/Repository'
import { default as Git } from '../../lib/VCS/Git'

let repoURL = url.parse('https://github.com/MisumiRize/vcs-clone')
let repo = new Repository(repoURL, __dirname)
let vcs = new Git(repo)

describe('Git', () => {

  describe('#getVerificationCommand()', () => {
    it('should return verification command', () => {
      let c = vcs.getVerificationCommand()
      assert.equal(c[0], 'git')
      assert.equal(c[1], 'ls-remote')
      assert.equal(c[2], `${repoURL.href}.git`)
    })
  })

  describe('#getCloneCommand()', () => {
    it('should return clone command', () => {
      let c = vcs.getCloneCommand()
      assert.equal(c[0], 'git')
      assert.equal(c[1], 'clone')
      assert.equal(c[2], `${repoURL.href}.git`)
      assert.equal(c[3], `${__dirname}/${repoURL.host}${repoURL.path}`)
    })
  })

  describe('#getUpdateCommand()', () => {
    it('should return update command', () => {
      let c = vcs.getUpdateCommand()
      assert.equal(c[0], 'git')
      assert.equal(c[1], 'pull')
      assert.equal(c[2], '--ff-only')
    })
  })
})
