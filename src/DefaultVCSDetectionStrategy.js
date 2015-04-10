import co from 'co'

import { silentlyVerify } from './spawn'
import { DefaultHostDefinition, DefaultVCSDefinition } from './VCS'

export default class DefaultVCSDetectionStrategy {

  constructor(hostDefinition, defaultVCSDefinition) {
    this.hostDefinition = hostDefinition
    this.defaultVCSDefinition = defaultVCSDefinition
  }

  detectVCS(repository) {
    let _this = this

    return co(function*() {
      let vcsDefinition
      if (_this.hostDefinition[repository.url.host]) {
        vcsDefinition = _this.hostDefinition[repository.url.host]
      } else {
        vcsDefinition = _this.defaultVCSDefinition
      }

      if (typeof vcsDefinition == 'function') {
        return new vcsDefinition(repository)
      }

      if (vcsDefinition.length == 1) {
        return vcsDefinition[0]
      }

      let verification = vcsDefinition.map(vcsClass => {
        let vcs = new vcsClass(repository)
        return silentlyVerify(`${vcs.name}:velify`, vcs.getVerificationCommand())
          .then(res => {
            return res ? vcs : null
          })
      })
      let result = yield verification

      for (let i = 0, len = result.length; i < len; i++) {
        if (result[i]) {
          return result[i]
        }
      }
    })
  }
}

export let instance = new DefaultVCSDetectionStrategy(DefaultHostDefinition, DefaultVCSDefinition)
