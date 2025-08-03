<template>
  <div class="edit-menu" :style="{ left: showEditMenu.x + 'px', top: showEditMenu.y + 'px' }">
    <div class="menu-item" @click="editDepartment">
      <i class="material-icons">edit</i>
      Edit Department
    </div>
    <div class="menu-item" @click="moveDepartment">
      <i class="material-icons">open_with</i>
      Move Department
    </div>
    <div class="menu-item" @click="deleteDepartment">
      <i class="material-icons">delete</i>
      Delete Department
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'

// Store
const store = useOrgChartStore()

// Computed from store
const showEditMenu = computed(() => store.showEditMenu)
const editMode = computed(() => store.editMode)
const activeDepartment = computed(() => store.activeDepartment)

// Methods
const editDepartment = () => {
  store.setEditMode(true)
  store.setShowEditMenu(null)
}

const moveDepartment = () => {
  store.setMoveDepartment()
  store.setShowEditMenu(null)
}

const deleteDepartment = () => {
  // Логика удаления департамента
  if (activeDepartment.value) {
    // Здесь можно добавить логику удаления
    console.log('Delete department:', activeDepartment.value.name)
  }
  store.setShowEditMenu(null)
}
</script>

<style scoped>
.edit-menu {
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
