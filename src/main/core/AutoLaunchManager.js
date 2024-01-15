import { app } from 'electron'
import logger from './Logger'

import { LOGIN_SETTING_OPTIONS } from '@shared/constants'
const AutoLaunch = require('auto-launch')
const motrixAutoLauncher = new AutoLaunch({ name: 'Motrix', isHidden: true })

export default class AutoLaunchManager {
  enable () {
    return new Promise((resolve, reject) => {
      const enabled = app.getLoginItemSettings(LOGIN_SETTING_OPTIONS).openAtLogin
      if (enabled) {
        resolve()
      }

      app.setLoginItemSettings({
        ...LOGIN_SETTING_OPTIONS,
        openAtLogin: true
      })
      resolve()
    })
  }

  disable () {
    return new Promise((resolve, reject) => {
      app.setLoginItemSettings({ openAtLogin: false })
      resolve()
    })
  }

  isEnabled () {
    return new Promise((resolve, reject) => {
      const enabled = app.getLoginItemSettings(LOGIN_SETTING_OPTIONS).openAtLogin
      resolve(enabled)
    })
  }

  // Linux
  enableForLinux () {
    motrixAutoLauncher.isEnabled().then(function (isEnabled) {
      // logger.info('是否自启动：' + isEnabled)
      if (!isEnabled) {
        motrixAutoLauncher.enable()
      }
    }).catch(function (err) {
      logger.info(err)
    })
  }

  disableForLinux () {
    motrixAutoLauncher.isEnabled().then(function (isEnabled) {
      // logger.info('是否自启动：' + isEnabled)
      if (isEnabled) {
        motrixAutoLauncher.disable()
      }
    }).catch(function (err) {
      logger.info(err)
    })
  }

  isEnabledForLinux () {
    return new Promise((resolve, reject) => {
      // const enabled = app.getLoginItemSettings(LOGIN_SETTING_OPTIONS).openAtLogin
      motrixAutoLauncher.isEnabled().then(isEnabled => {
        resolve(isEnabled)
      })
    })
  }
}
