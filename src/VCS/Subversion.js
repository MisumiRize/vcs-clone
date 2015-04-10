import { default as Base } from './Base'

export default class Subversion extends Base {

  constructor(repository) {
    super(repository)
    this.name = 'subversion'
  }

  getVerificationCommand() {
    return ['svn', 'info', this.repository.url.href]
  }

  getCloneCommand(options = {}) {
    return [
      'svn',
      'checkout',
      this.repository.url.href,
      this.repository.getLocalPath(),
    ]
  }

  getUpdateCommand(options = {}) {
    return ['svn', 'update']
  }
}
