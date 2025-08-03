<template>
  <div class="page-header">
    <div class="header-content">
      <div class="title-section">
        <h1>{{ chart.name || 'Organization Chart' }}</h1>
        <div v-if="updatedOn" class="updated-on">
          Last updated: {{ updatedOn }}
        </div>
      </div>

      <div class="controls-section">
        <button
          v-if="editMode"
          @click="toggleEditMode"
          class="control-btn"
        >
          <i class="material-icons">visibility</i>
          View Mode
        </button>
        <button v-else @click="toggleEditMode" class="control-btn">
          <i class="material-icons">edit</i>
          Edit Mode
        </button>

        <button @click="resetZoom" class="control-btn">
          <i class="material-icons">zoom_out</i>
          Reset Zoom
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'

// Store
const store = useOrgChartStore()

// Computed from store
const chart = computed(() => store.chart)
const editMode = computed(() => store.editMode)
const config = computed(() => store.config)
const updatedOn = computed(() => store.updatedOn)

// Methods
const toggleEditMode = () => {
  store.setEditMode(!editMode.value)
}

const resetZoom = () => {
  store.resetZoom()
}
</script>

<style scoped>
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid #ddd;
  z-index: 100;
  padding: 10px 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.title-section h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.updated-on {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.controls-section {
  display: flex;
  gap: 10px;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.control-btn:hover {
  background: #f5f5f5;
  border-color: #ccc;
}

.control-btn i {
  font-size: 16px;
}
</style>
