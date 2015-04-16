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
      assert.deepEqual(c, ['git', 'ls-remote', `${repoURL.href}.git`])
    })
  })

  describe('#getCloneCommand()', () => {
    it('should return clone command', () => {
      let c = vcs.getCloneCommand()
      assert.deepEqual(c, ['git', 'clone', `${repoURL.href}.git`, `${__dirname}/${repoURL.host}${repoURL.path}`])
    })
  })

  describe('#getUpdateCommand()', () => {
    it('should return update command', () => {
      let c = vcs.getUpdateCommand()
      assert.deepEqual(c, ['git', 'pull', '--ff-only'])
    })
  })
})
