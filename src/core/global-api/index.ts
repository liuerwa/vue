import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'
import type { GlobalAPI } from 'types/global-api'

export function initGlobalAPI(Vue: GlobalAPI) {
  // config
  const configDef: Record<string, any> = {}
  configDef.get = () => config
  if (__DEV__) {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }

  // def Vue配置config
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 定义util对象
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  // 定义set函数
  Vue.set = set
  // 定义delete函数
  Vue.delete = del
  // 定义nextTick函数
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
   //暴露observable函数
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  //创建options空对象
  Vue.options = Object.create(null)
    // 定义components,directives,filters，空对象
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  // 挂载组件，KeepLive
  extend(Vue.options.components, builtInComponents)

  // 定义Vue.use函数
  initUse(Vue)
  // 定义Vue.mixin函数
  initMixin(Vue)
  // 定义Vue.extend函数
  initExtend(Vue)
  // 定义Vue.compoenent、Vue.directive、Vue.filter函数
  initAssetRegisters(Vue)
}
