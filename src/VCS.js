import { default as Git } from './VCS/Git'
import { default as Mercurial } from './VCS/Mercurial'

export default {
  Git: Git,
  Mercurial: Mercurial,
}

export let DefaultHostDefinition = {
  'github.com': Git,
}

export let DefaultVCSDefinition = [Git, Mercurial]
