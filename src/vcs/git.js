import Base from './base'

export default class Git extends Base {

  getCloneCommand(root, options) {
    return [
      'git',
      'clone',
      this.repository.url.href,
      this.repository.getLocalPath(root),
    ]
  }

  getUpdateCommand(root, options) {
    return ['git', 'pull', '--ff-only']
  }
}
