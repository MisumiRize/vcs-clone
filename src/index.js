import url from 'url'
import path from 'path'
import mkdirp from 'mkdirp'
import Repository from './repository'

const HAS_SCHEME_PATTERN = /^[^:]+:\/\//

function parse(argUrl) {
  let fullUrl = (HAS_SCHEME_PATTERN.test(argUrl)) ? argUrl : `https://${argUrl}`
  return url.parse(fullUrl)
}

export default function vcsClone(argUrl, root, options = {}) {
  let parsedUrl = parse(argUrl)

  if (!parsedUrl.host) {
    throw new Error('invalid url')
  }

  let repository = new Repository(parsedUrl)
}
