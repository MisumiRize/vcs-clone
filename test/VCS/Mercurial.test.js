import url from 'url'
import assert from 'power-assert'

import { default as Repository } from '../../lib/Repository'
import { default as Mercurial } from '../../lib/VCS/Mercurial'

let repoURL = url.parse('https://github.com/MisumiRize/vcs-clone')
let repo = new Repository(repoURL, __dirname)
let vcs = new Mercurial(repo)

describe('Mercurial', () => {

  describe('#getVerificationCommand()', () => {
    it('should return verification command', () => {
      let c = vcs.getVerificationCommand()
      assert.deepEqual(c, ['hg', 'identify', repoURL.href])
    })
  })

  describe('#getCloneCommand()', () => {
    it('should return clone command', () => {
      let c = vcs.getCloneCommand()
      assert.deepEqual(c, ['hg', 'clone', repoURL.href, `${__dirname}/${repoURL.host}${repoURL.path}`])
    })
  })

  describe('#getUpdateCommand()', () => {
    it('should return update command', () => {
      let c = vcs.getUpdateCommand()
      assert.deepEqual(c, ['hg', 'pull', '--update'])
    })
  })
})
