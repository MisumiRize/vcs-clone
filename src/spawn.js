import childProcess from 'child_process'
import debug from 'debug'

export function ensure(namespace, fullCommand, options = {}) {
  let procDebug = debug(`vcs-clone:${namespace}`), command, args
  [command, ...args] = fullCommand

  return new Promise((resolve, reject) => {
    procDebug(fullCommand.join(' '))

    let proc = childProcess.spawn(command, args, options)

    proc.stdout.on('data', data => { procDebug(String(data).trim()) })
    proc.stderr.on('data', data => { procDebug(String(data).trim()) })

    proc.on('exit', (code) => {
      if (code == 0) {
        procDebug('command finished as success')
        resolve()
      } else {
        procDebug('command finished as error')
        reject(`Command ${fullCommand.join(' ')} returned non-zero status`)
      }
    })
  })
}

export function silentlyVerify(namespace, fullCommand) {
  let procDebug = debug(`vcs-clone:${namespace}`), command, args
  [command, ...args] = fullCommand

  return new Promise((resolve, reject) => {
    procDebug(fullCommand.join(' '))

    let proc = childProcess.spawn(command, args)
    proc.on('exit', (code) => {
      if (code == 0) {
        procDebug('command finished as success')
        resolve(true)
      } else {
        procDebug('command finished as error')
        resolve(false)
      }
    })
  })
}
