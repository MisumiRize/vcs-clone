import path from 'path'

export default class Repository {

  constructor(url, root) {
    this.url = url
    this.root = root
  }

  getLocalPath() {
    return path.join(this.root, this.url.host, this.url.path)
  }
}
