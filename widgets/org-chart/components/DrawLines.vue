<template>
  <svg class="graph" id="svg">
    <path
      v-for="line in lines"
      :key="line.id"
      :d="line.d"
      style="stroke: #b6b4b4; stroke-width: 2"
      fill="transparent"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'

// Store
const store = useOrgChartStore()

// Computed from store
const lines = computed(() => store.lines)
</script>

<style scoped>
.graph {
  width: 100%;
  height: 800px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -1;
}
</style>
