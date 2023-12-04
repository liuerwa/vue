import Vue from 'core/index'
import config from 'core/config'
import { extend, noop } from 'shared/util'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser } from 'core/util/index'

import {
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement
} from 'web/util/index'

import { patch } from './patch'
import platformDirectives from './directives/index'
import platformComponents from './components/index'
import type { Component } from 'types/component'

// install platform specific utils
// 配置平台相关方法
// 判断是否是必须绑定prop的元素，比如input必须有value属性等
Vue.config.mustUseProp = mustUseProp
// 检测是否是保留标签，包含HTML标签和svg标签
Vue.config.isReservedTag = isReservedTag
// 检测是否是保留属性，包含class和style
Vue.config.isReservedAttr = isReservedAttr
// 获取标签命名空间
Vue.config.getTagNamespace = getTagNamespace
// 检测是否是未知类型的元素
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
// 挂载平台相关指令，platformDirectives 包含v-model和v-show
extend(Vue.options.directives, platformDirectives)
// 挂载平台相关组件，platformComponents 包含Transition和TransitionGroup
extend(Vue.options.components, platformComponents)

// install platform patch function
// 挂载patch函数，即vnode dom diff函数
Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
// 挂载 $mount 函数
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(() => {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue)
      } else if (__DEV__ && process.env.NODE_ENV !== 'test') {
        // @ts-expect-error
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
            'https://github.com/vuejs/vue-devtools'
        )
      }
    }
    if (
      __DEV__ &&
      process.env.NODE_ENV !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      // @ts-expect-error
      console[console.info ? 'info' : 'log'](
        `You are running Vue in development mode.\n` +
          `Make sure to turn on production mode when deploying for production.\n` +
          `See more tips at https://vuejs.org/guide/deployment.html`
      )
    }
  }, 0)
}

export default Vue
