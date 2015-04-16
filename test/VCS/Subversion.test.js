import url from 'url'
import assert from 'power-assert'

import { default as Repository } from '../../lib/Repository'
import { default as Subversion } from '../../lib/VCS/Subversion'

let repoURL = url.parse('https://svnhub.com/MisumiRize/vcs-clone')
let repo = new Repository(repoURL, __dirname)
let vcs = new Subversion(repo)

describe('Subversion', () => {

  describe('#getVerificationCommand()', () => {
    it('should return verification command', () => {
      let c = vcs.getVerificationCommand()
      assert.deepEqual(c, ['svn', 'info', repoURL.href])
    })
  })

  describe('#getCloneCommand()', () => {
    it('should return clone command', () => {
      let c = vcs.getCloneCommand()
      assert.deepEqual(c, ['svn', 'checkout', repoURL.href, `${__dirname}/${repoURL.host}${repoURL.path}`])
    })
  })

  describe('#getUpdateCommand()', () => {
    it('should return update command', () => {
      let c = vcs.getUpdateCommand()
      assert.deepEqual(c, ['svn', 'update'])
    })
  })
})
