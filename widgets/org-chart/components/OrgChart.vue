<template>
  <div id="chart">
    <div class="chart_container">
      <show-dept v-if="chart" :parent="chart" :level="1" />
      <draw-lines v-if="chart" />
      <view-menu v-if="showViewMenu" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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
  setTimeout(() => {
    try {
      const chartElement = document.querySelector('#chart')
      if (chartElement) {
        console.log('Chart element found, initializing panzoom...')
        store.initZoom()
        store.addLine()
      } else {
        console.warn('Chart element not found, retrying...')
        // Повторная попытка через еще 1000ms
        setTimeout(() => {
          const chartElement = document.querySelector('#chart')
          if (chartElement) {
            console.log(
              'Chart element found on retry, initializing panzoom...'
            )
            store.initZoom()
            store.addLine()
          } else {
            console.error('Chart element still not found after retry')
            // Еще одна попытка через 2000ms
            setTimeout(() => {
              const chartElement = document.querySelector('#chart')
              if (chartElement) {
                console.log(
                  'Chart element found on final retry, initializing panzoom...'
                )
                store.initZoom()
                store.addLine()
              } else {
                console.error(
                  'Chart element not found after all retries'
                )
              }
            }, 2000)
          }
        }, 1000)
      }
    } catch (error) {
      console.warn('Panzoom initialization failed:', error)
    }
  }, 2000) // Увеличиваем задержку для полной загрузки DOM
})
</script>

<style scoped>
#chart {
  position: relative;
  margin-left: 300px;
  padding: 10px;
  margin-top: 50px;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  min-width: 500px;
  -ms-user-select: none;
  user-select: none;
  background-color: white;
}

.chart_container {
  margin: auto;
  display: inline-block;
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
</style>
