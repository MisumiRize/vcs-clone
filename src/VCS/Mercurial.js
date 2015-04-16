import { default as Base } from './Base'

export default class Mercurial extends Base {
  name = 'mercurial'

  getVerificationCommand() {
    return ['hg', 'identify', this.repository.url.href]
  }

  getCloneCommand(options) {
    return [
      'hg',
      'clone',
      this.repository.url.href,
      this.repository.getLocalPath(),
    ]
  }

  getUpdateCommand(options) {
    return ['hg', 'pull', '--update']
  }
}
