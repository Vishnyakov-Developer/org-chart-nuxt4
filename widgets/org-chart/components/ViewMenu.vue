<template>
  <div class="view-menu" :style="{ left: showViewMenu.x + 'px', top: showViewMenu.y + 'px' }">
    <div class="menu-item" @click="showChildren">
      <i class="material-icons">expand_more</i>
      Show Children
    </div>
    <div class="menu-item" @click="hideChildren">
      <i class="material-icons">expand_less</i>
      Hide Children
    </div>
    <div class="menu-item" @click="showParents">
      <i class="material-icons">arrow_upward</i>
      Show Parents
    </div>
    <div class="menu-item" @click="hideParents">
      <i class="material-icons">arrow_downward</i>
      Hide Parents
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'

// Store
const store = useOrgChartStore()

// Computed from store
const showViewMenu = computed(() => store.showViewMenu)
const activeDepartment = computed(() => store.activeDepartment)

// Methods
const showChildren = () => {
  if (activeDepartment.value) {
    store.showChildren(activeDepartment.value)
  }
  store.setShowViewMenu(null)
}

const hideChildren = () => {
  if (activeDepartment.value) {
    activeDepartment.value.showChildren = false
  }
  store.setShowViewMenu(null)
}

const showParents = () => {
  if (activeDepartment.value) {
    activeDepartment.value.showParents = true
  }
  store.setShowViewMenu(null)
}

const hideParents = () => {
  if (activeDepartment.value) {
    activeDepartment.value.showParents = false
  }
  store.setShowViewMenu(null)
}
</script>

<style scoped>
.view-menu {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 200px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item i {
  margin-right: 8px;
  font-size: 18px;
  color: #666;
}

.menu-item:not(:last-child) {
  border-bottom: 1px solid #eee;
}
</style>
