import path from 'path'
import vcs from './vcs'

export default class Repository {

  constructor(url) {
    this.url = url
  }

  getVCS() {
    return new vcs.Git(this)
  }

  getLocalPath(root) {
    console.log(root)
    return path.join(root, this.url.host, this.url.path)
  }
}
