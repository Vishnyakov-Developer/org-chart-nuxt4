import { ref, computed, watchEffect } from 'vue'

export function useAsyncComputed(getter, defaultValue = null) {
  const result = ref(defaultValue)
  const loading = ref(false)
  const error = ref(null)

  const asyncComputed = computed(() => {
    loading.value = true
    error.value = null

    try {
      const value = getter()
      if (value instanceof Promise) {
        value.then(res => {
          result.value = res
          loading.value = false
        }).catch(err => {
          error.value = err
          loading.value = false
        })
      } else {
        result.value = value
        loading.value = false
      }
    } catch (err) {
      error.value = err
      loading.value = false
    }

    return result.value
  })

  return {
    result: asyncComputed,
    loading,
    error
  }
} 