import { default as Base } from './Base'

export default class Git extends Base {

  constructor(repository) {
    super(repository)
    this.name = 'git'
  }

  getVerificationCommand() {
    return ['git', 'ls-remote', `${this.repository.url.href}.git`]
  }

  getCloneCommand(options = {}) {
    return [
      'git',
      'clone',
      `${this.repository.url.href}.git`,
      this.repository.getLocalPath(),
    ].join(' ')
  }

  getUpdateCommand(options = {}) {
    return ['git', 'pull', '--ff-only']
  }
}
