import { ref, computed } from 'vue'
import { createStore } from '.'

export const useCounterStore = createStore(() => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
