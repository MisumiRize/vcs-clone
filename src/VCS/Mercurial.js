import { default as Base } from './Base'

export default class Mercurial extends Base {

  constructor(repository) {
    super(repository)
    this.name = 'mercurial'
  }

  getVerificationCommand() {
    return ['hg', 'identity', this.repository.url.href]
  }

  getCloneCommand(options = {}) {
    return [
      'hg',
      'clone',
      this.repository.url.href,
      this.repository.getLocalPath(),
    ]
  }

  getUpdateCommand(options = {}) {
    return ['hg', 'pull', '--update']
  }
}
