<template>
  <div id="chart">
    <div class="chart_container">
      <draw-lines v-if="chart" />
      <show-dept v-if="chart" :parent="chart" :level="1" />
      <view-menu v-if="showViewMenu" />
    </div>

    <!-- Тестовая кнопка для перерендера линий -->
    <button
      class="test-button"
      @click="testRefreshLines"
      title="Перерендер линий"
    >
      🔄 Перерисовать линии
    </button>

    <!-- Кнопка для центрирования на первом элементе -->
    <button
      class="center-button"
      @click="centerOnFirst"
      title="Центрировать на первом элементе"
    >
      🎯 Центрировать
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'

// Components
import ShowDept from './ShowDept.vue'
import DrawLines from './DrawLines.vue'
import EditMenu from './EditMenu.vue'
import ViewMenu from './ViewMenu.vue'

// Store
const store = useOrgChartStore()

// Local state
const tree = ref(null)
const cancelScroll = ref(null)
const scrollOptions = ref({
  container: 'body',
  easing: 'ease-in',
  offset: -500,
  force: true,
  cancelable: true,
  onStart: function (element) {
    // scrolling started
  },
  onDone: function (element) {
    // scrolling is done
  },
  onCancel: function () {
    // scrolling has been interrupted
  },
  x: true,
  y: true,
})

// Computed from store
const chart = computed(() => store.chart)
const options = computed(() => store.config)
const showEditMenu = computed(() => store.showEditMenu)
const showViewMenu = computed(() => store.showViewMenu)
const moveDepartment = computed(() => store.moveDepartment)
const columnView = computed(() => store.columnView)
const columnView_noStaff = computed(() => store.columnView_noStaff)
const activeDepartment = computed(() => store.activeDepartment)

// Lifecycle
onMounted(() => {
  console.log('OrgChart component mounted')

  // Простой тест panzoom
  setTimeout(() => {
    const chartElement = document.querySelector('#chart')
    if (chartElement) {
      console.log('=== Testing panzoom directly ===')
      try {
        // Импортируем panzoom напрямую для теста
        import('panzoom')
          .then((panzoomModule) => {
            const panzoom = panzoomModule.default || panzoomModule
            console.log('Direct panzoom import:', panzoom)

            const testInstance = panzoom(chartElement, {
              maxZoom: 2,
              minZoom: 0.2,
            })

            console.log(
              'Test panzoom instance created:',
              testInstance
            )

            // Удаляем тестовый экземпляр
            testInstance.dispose()
          })
          .catch((error) => {
            console.error('Direct panzoom import failed:', error)
          })
      } catch (error) {
        console.error('Panzoom test failed:', error)
      }
    }
  }, 1000)

  // Функция для инициализации zoom
  const initializeZoom = () => {
    console.log('=== initializeZoom called ===')
    const chartElement = document.querySelector('#chart')
    if (chartElement) {
      console.log('Chart element found, initializing panzoom...')
      console.log('Chart element dimensions:', {
        offsetWidth: chartElement.offsetWidth,
        offsetHeight: chartElement.offsetHeight,
        clientWidth: chartElement.clientWidth,
        clientHeight: chartElement.clientHeight,
        scrollWidth: chartElement.scrollWidth,
        scrollHeight: chartElement.scrollHeight,
      })

      // Устанавливаем минимальные размеры если нужно
      if (
        chartElement.offsetWidth < 100 ||
        chartElement.offsetHeight < 100
      ) {
        chartElement.style.minWidth = '500px'
        chartElement.style.minHeight = '400px'
        console.log('Set minimum dimensions for chart element')
      }

      // Простой тест panzoom
      try {
        import('panzoom').then((panzoomModule) => {
          const panzoom = panzoomModule.default || panzoomModule
          console.log('Testing panzoom directly...')

          // Удаляем старый экземпляр если есть
          if (store.zoomInstance) {
            store.zoomInstance.dispose()
            store.zoomInstance = null
          }

          // Создаем простой экземпляр panzoom
          const instance = panzoom(chartElement, {
            maxZoom: 2,
            minZoom: 0.2,
          })

          console.log('Simple panzoom instance created:', instance)
          store.zoomInstance = instance

          // Устанавливаем начальную позицию для показа карточек
          // setTimeout(() => {
          //   centerOnFirstElement(instance)
          // }, 10000) // Увеличиваем задержку до 2 секунд

          // setTimeout(() => {
          //   console.log('Testing zoom functionality...')
          //   instance.zoomTo(1.5)
          //   console.log('Zoom test completed')
          // }, 1000)
        })
      } catch (error) {
        console.error('Panzoom test failed:', error)
      }

      // Создаем линии после инициализации zoom
      setTimeout(() => {
        console.log('Creating lines after zoom initialization...')

        // Проверяем готовность DOM перед созданием линий
        const checkDOMReady = () => {
          const chartElement = document.querySelector('#chart')
          const deptElements =
            document.querySelectorAll('[data-dept-id]')

          console.log(
            'DOM check - Chart element:',
            !!chartElement,
            'Dept elements:',
            deptElements.length
          )

          if (chartElement && deptElements.length > 0) {
            console.log('DOM is ready, creating lines...')
            store.addLine()

            // Дополнительное центрирование после создания линий
            setTimeout(() => {
              if (store.zoomInstance) {
                console.log(
                  'Additional centering after lines creation...'
                )
                centerOnFirstElement(store.zoomInstance)
              }
            }, 500)
          } else {
            console.log('DOM not ready, retrying...')
            setTimeout(checkDOMReady, 200)
          }
        }

        checkDOMReady()
      }, 1000) // Увеличиваем задержку до 1 секунды
    } else {
      console.warn('Chart element not found, will retry...')
    }
  }

  // Функция для центрирования на первом элементе
  const centerOnFirstElement = (panzoomInstance) => {
    console.log('=== Centering on first element ===')

    const chartElement = document.querySelector('#chart')
    if (!chartElement) {
      console.warn('Chart element not found for centering')
      return
    }

    // Находим первый элемент с data-dept-id
    const firstDeptElement = document.querySelector('[data-dept-id]')
    if (!firstDeptElement) {
      console.warn('First department element not found')
      return
    }

    // Получаем размеры контейнера
    const containerRect = chartElement.getBoundingClientRect()
    const elementRect = firstDeptElement.getBoundingClientRect()

    console.log('Container dimensions:', {
      width: containerRect.width,
      height: containerRect.height,
    })

    console.log('First element position:', {
      left: elementRect.left,
      top: elementRect.top,
      width: elementRect.width,
      height: elementRect.height,
    })

    // Вычисляем позицию для центрирования
    // Chart имеет фиксированную ширину 16000px
    const chartWidth = 16000
    const containerWidth = containerRect.width

    // Центрируем по горизонтали - показываем начало диаграммы
    // Перемещаем влево на половину разности ширины
    // const centerX = -(chartWidth - containerWidth) / 2
    const centerX = -7605

    // Центрируем по вертикали с небольшим отступом сверху
    const centerY = 100 // Отступ сверху в пикселях

    console.log('Calculated center position:', {
      x: centerX,
      y: centerY,
      chartWidth: chartWidth,
      containerWidth: containerWidth,
      difference: chartWidth - containerWidth,
    })

    // Применяем позицию через panzoom
    if (panzoomInstance) {
      console.log('Applying position via panzoom.moveTo()')
      panzoomInstance.moveTo(centerX, centerY)
      console.log('Applied center position via panzoom')
    } else {
      // Fallback - применяем напрямую к элементу
      console.log('Applying position directly to element')
      chartElement.style.transform = `translate(${centerX}px, ${centerY}px)`
      console.log('Applied center position directly')
    }
  }

  // Функция для тестирования перерендера линий
  const testRefreshLines = () => {
    console.log('=== Test refresh lines button clicked ===')
    console.log('Current lines:', store.lines)
    console.log('Current chart:', store.chart)

    // Принудительно пересчитываем линии
    store.forceUpdateLines()

    // Проверяем результат
    setTimeout(() => {
      console.log('Lines after force update:', store.lines)
    }, 200)
  }

  // Функция для центрирования на первом элементе (для кнопки)
  const centerOnFirst = () => {
    console.log('=== Center button clicked ===')
    if (store.zoomInstance) {
      centerOnFirstElement(store.zoomInstance)
    } else {
      console.warn('Zoom instance not available')
    }
  }

  // Первая попытка через 1000ms
  setTimeout(() => {
    initializeZoom()
  }, 1000)

  // Вторая попытка через 3000ms если первая не удалась
  setTimeout(() => {
    const chartElement = document.querySelector('#chart')
    if (chartElement && !store.zoomInstance) {
      console.log('Retrying zoom initialization...')
      initializeZoom()
    }
  }, 3000)

  // Принудительное центрирование через 4 секунды
  setTimeout(() => {
    console.log('=== Forced centering after 4 seconds ===')
    if (store.zoomInstance) {
      centerOnFirstElement(store.zoomInstance)
    } else {
      console.warn('Zoom instance not available for forced centering')
    }
  }, 4000)

  // Добавляем обработчик изменения размера окна
  const handleResize = () => {
    console.log('Window resized, recalculating lines...')
    setTimeout(() => {
      store.refreshLines()
    }, 200) // Увеличиваем задержку для стабилизации
  }

  window.addEventListener('resize', handleResize)

  // Также добавляем обработчик для изменения размера консоли
  const handleDevToolsResize = () => {
    console.log('DevTools resized, recalculating lines...')
    setTimeout(() => {
      store.refreshLines()
    }, 300) // Больше задержка для DevTools
  }

  // Добавляем обработчик изменения масштаба браузера
  const handleBrowserZoom = () => {
    console.log('Browser zoom changed, recalculating lines...')
    setTimeout(() => {
      store.forceUpdateLines()
    }, 300)
  }

  // Отслеживаем изменения масштаба браузера
  let lastZoomLevel = window.visualViewport
    ? window.visualViewport.scale
    : 1
  const checkZoomChange = () => {
    const currentZoom = window.visualViewport
      ? window.visualViewport.scale
      : window.outerWidth / window.innerWidth || 1

    if (Math.abs(currentZoom - lastZoomLevel) > 0.01) {
      console.log(
        'Zoom level changed from',
        lastZoomLevel,
        'to',
        currentZoom
      )
      lastZoomLevel = currentZoom
      handleBrowserZoom()
    }
  }

  // Проверяем изменения масштаба каждые 500ms
  const zoomCheckInterval = setInterval(checkZoomChange, 500)

  // Очищаем обработчики при размонтировании
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (window.visualViewport) {
      window.visualViewport.removeEventListener(
        'resize',
        handleZoomChange
      )
      window.visualViewport.removeEventListener(
        'scroll',
        handleZoomChange
      )
    }
    clearInterval(zoomCheckInterval)
  })

  // Запрет масштабирования браузера
  const preventZoom = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      return false
    }
  }

  // Добавляем обработчики для предотвращения масштабирования
  document.addEventListener('wheel', preventZoom, { passive: false })
  document.addEventListener('keydown', preventZoom, {
    passive: false,
  })
  document.addEventListener('gesturestart', preventZoom, {
    passive: false,
  })
  document.addEventListener('gesturechange', preventZoom, {
    passive: false,
  })
  document.addEventListener('gestureend', preventZoom, {
    passive: false,
  })

  // Удаляем обработчики при размонтировании
  onUnmounted(() => {
    document.removeEventListener('wheel', preventZoom)
    document.removeEventListener('keydown', preventZoom)
    document.removeEventListener('gesturestart', preventZoom)
    document.removeEventListener('gesturechange', preventZoom)
    document.removeEventListener('gestureend', preventZoom)
  })
})
</script>

<style scoped>
#chart {
  position: relative;
  margin-left: 0;
  padding: 10px;
  margin-top: 50px;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  min-width: 500px;
  -ms-user-select: none;
  user-select: none;
  background-color: white;
  width: 16000px; /* Устанавливаем фиксированную ширину */
  height: 100%;
  overflow: hidden;
  transform-origin: 0 0;
}

.chart_container {
  margin: auto;
  display: inline-block;
  position: relative;
  transform-origin: 0 0;
  width: 100%; /* Добавляем полную ширину */
  height: 100%; /* Добавляем полную высоту */
}

.arrow {
  font-size: 30px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  margin: -8px;
}

.down {
  cursor: zoom-in;
}

.up {
  cursor: zoom-out;
}

.test-button {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s;
}

.test-button:hover {
  background-color: #0056b3;
}

.test-button:active {
  background-color: #004085;
}

.center-button {
  position: fixed;
  top: 50px;
  right: 10px;
  z-index: 1000;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s;
}

.center-button:hover {
  background-color: #218838;
}

.center-button:active {
  background-color: #1e7e34;
}
</style>
