<template>
  <div v-if="showSideScreen" class="side-screen">
    <button class="right" @click="closeSideScreen">
      <i class="material-icons arrow">keyboard_arrow_left</i>
    </button>
    <template v-if="activeDepartment">
      <div class="title">{{ activeDepartment.name }}</div>
      <div class="tabs">
        <button
          class="tab"
          :class="{ active: activeTab === 1 }"
          @click="activeTab = 1"
        >
          {{ uiNames.sidebar.detailTabName }}
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 2 }"
          @click="activeTab = 2"
        >
          {{ uiNames.sidebar.peopleTabName }}
        </button>
      </div>
      <department-details v-if="activeTab === 1" />
      <employee-list v-if="activeTab === 2" />
    </template>
  </div>

  <div v-else class="noside-screen">
    <button class="right" @click="openSideScreen">
      <i class="material-icons arrow">keyboard_arrow_right</i>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'
import EmployeeList from './EmployeeList.vue'
import DepartmentDetails from './DepartmentDetails.vue'

// Store
const store = useOrgChartStore()

// Local state
const personPicker = ref(null)
const activeTab = ref(1)
const noPhotos = ref([])

// Computed from store
const showSideScreen = computed(() => store.showSideScreen)
const activeDepartment = computed(() => store.activeDepartment)
const people = computed(() => store.people)
const config = computed(() => store.config)
const uiNames = computed(() => store.uiNames)

// Methods
const closeSideScreen = () => {
  store.closeSideScreen()
}

const openSideScreen = () => {
  store.openSideScreen()
}
</script>

<style scoped>
.title {
  text-align: center;
  min-height: 50px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
  width: calc(100% - 30px);
}

.name {
  font-size: 16px;
}

.role {
  color: grey;
  font-size: 14px;
}

.tabs {
  width: 100%;
  margin-bottom: 20px;
  padding: 0px 10px;
  border-bottom: 2px solid lightgrey;
}

.tab {
  width: 120px;
  margin: 0px 0px 0px 0px;
  border: none;
  background: none;
  margin-bottom: -2px;
  border-bottom: 2px solid transparent;
  outline: none;
  cursor: pointer;
}

.tab.active {
  border: 2px solid lightgrey;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  background-color: lightgrey;
}

input.name {
  width: calc(100% - 10px);
}

.side-screen {
  position: fixed;
  left: 0px;
  top: 50px;
  width: 300px;
  height: 100vh;
  border-right: 0px solid lightgrey;
  background-color: #f9f5f5;
  padding: 5px;
  overflow: auto;
  padding-bottom: 80px;
}

.noside-screen {
  position: fixed;
  left: 0px;
  top: 50px;
  width: 25px;
  height: 45px;
  border: 0px solid lightgray;
  background-color: #f9f5f5;
  z-index: 9;
}

.right {
  position: absolute;
  right: 0px;
  top: 10px;
  background-color: transparent;
  border: 0px solid grey;
  padding: 1px;
  cursor: pointer;
}

.right:focus {
  outline: none;
}
</style>
