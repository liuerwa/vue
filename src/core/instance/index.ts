import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
import type { GlobalAPI } from 'types/global-api'

// 本命函数
function Vue(options) {
  if (__DEV__ && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 初始化，主函数
  this._init(options)
}

// 往Vue函数上绑定原型函数，例如上面的_init函数
//@ts-expect-error Vue has function type
initMixin(Vue)
// 初始化$data、$props、$set、$delete、$watch等函数
//@ts-expect-error Vue has function type
stateMixin(Vue)
// 定义$on、$once、$off、$emit等函数
//@ts-expect-error Vue has function type
eventsMixin(Vue)
// 定义update、$forceUpdate、$destroy等函数
//@ts-expect-error Vue has function type
lifecycleMixin(Vue)
// 定义$nextTick、render等函数
//@ts-expect-error Vue has function type
renderMixin(Vue)

export default Vue as unknown as GlobalAPI
