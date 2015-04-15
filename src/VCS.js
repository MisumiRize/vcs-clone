import { default as Git } from './VCS/Git'
import { default as Mercurial } from './VCS/Mercurial'
import { default as Subversion } from './VCS/Subversion'

export default {
  Git: Git,
  Mercurial: Mercurial,
  Subversion: Subversion,
}

export let DefaultHostDefinition = {
  'github.com': Git,
}

export let DefaultVCSDefinition = [Mercurial, Git]
