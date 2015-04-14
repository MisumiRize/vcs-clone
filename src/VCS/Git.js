import { default as Base } from './Base'

export default class Git extends Base {
  name = 'git'

  getVerificationCommand() {
    return ['git', 'ls-remote', `${this.repository.url.href}.git`]
  }

  getCloneCommand(options) {
    return [
      'git',
      'clone',
      `${this.repository.url.href}.git`,
      this.repository.getLocalPath(),
    ]
  }

  getUpdateCommand(options) {
    return ['git', 'pull', '--ff-only']
  }
}
