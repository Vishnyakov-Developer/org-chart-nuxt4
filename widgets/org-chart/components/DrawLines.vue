<template>
  <svg class="graph" id="svg">
    <defs>
      <filter
        id="shadow"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
      >
        <feDropShadow
          dx="1"
          dy="1"
          stdDeviation="2"
          flood-color="rgba(0,0,0,0.1)"
        />
      </filter>
    </defs>
    <path
      v-for="(line, index) in lines"
      :key="index"
      :d="line.d"
      class="connection-line"
      fill="transparent"
    />
  </svg>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'

// Store
const store = useOrgChartStore()

// Computed from store
const lines = computed(() => store.lines)

// Debug
onMounted(() => {
  console.log('DrawLines mounted, lines:', lines.value)
})

watch(
  lines,
  (newLines) => {
    console.log('Lines updated:', newLines)
  },
  { deep: true }
)

// Добавляем обработчик для обновления линий при изменении размера
const handleSVGResize = () => {
  console.log('SVG resized, updating lines...')
  setTimeout(() => {
    store.refreshLines()
  }, 100)
}

// Наблюдаем за изменениями размера SVG
onMounted(() => {
  const svg = document.getElementById('svg')
  if (svg) {
    const resizeObserver = new ResizeObserver(() => {
      handleSVGResize()
    })
    resizeObserver.observe(svg)
  }
})
</script>

<style scoped>
.graph {
  width: 16000px; /* Соответствует ширине контейнера */
  height: 100vh; /* Полная высота viewport */
  position: absolute; /* Возвращаем absolute */
  top: 0px;
  left: 0px;
  z-index: -1;
  pointer-events: none;
  transform-origin: 0 0;
}

.connection-line {
  stroke: #4a5568;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: url(#shadow);
  transition: stroke 0.3s ease;
  vector-effect: non-scaling-stroke;
  transform-origin: 0 0;
}

.connection-line:hover {
  stroke: #2d3748;
  stroke-width: 3;
}
</style>
