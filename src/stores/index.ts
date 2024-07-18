import { effectScope } from "vue";

export function createStore(factory: any) {
  let initialized = false
  let state: any
  const scope = effectScope(true)

  return (...args: any[]) => {
    // 如果没有初始化，就初始化
    if (!initialized) {
      state = scope.run(() => factory(...args))
      initialized = true
    }

    return state
  }
}
