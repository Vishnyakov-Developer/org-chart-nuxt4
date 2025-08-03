<template>
  <div
    class="dept-box"
    :class="[type, active]"
    :id="'ID_' + departmentData.id"
    :data-dept-id="departmentData.id"
    @click="setActiveDepartment(departmentData, $event)"
    @touchend="setActiveDepartment(departmentData, $event)"
    @contextmenu.prevent="showCtxMenu(departmentData, $event)"
    @mouseenter="mouseOverBox(true)"
    @mouseleave="mouseOverBox(false)"
  >
    <ChevronUpIcon
      v-if="displaySiblingIcon"
      class="view-button"
      @click="handleShowViewMenu(departmentData, $event)"
      title="Show/hide parents"
    />

    <table>
      <tbody>
        <tr>
          <td class="ppl_count0">
            <div v-if="showNrPeople" class="ppl_count">
              <div
                v-if="departmentData.children.length"
                class="ppl_count_nr"
                :title="
                  departmentData.children.length +
                  (departmentData.children.length === 1
                    ? ' subdepartment'
                    : ' subdepartments')
                "
              >
                {{ departmentData.children.length }}
              </div>
            </div>
          </td>
          <td v-if="managerPhotoView">
            <img
              v-if="departmentData.manager.photo"
              class="profile"
              :src="
                config.photoUrl.prefix +
                departmentData.manager.photo +
                config.photoUrl.suffix
              "
            />
            <div v-else class="initials-circle">
              {{ getInitials(departmentData.manager.name) }}
            </div>
          </td>
          <td>
            <div
              class="level_indicator"
              :style="{
                backgroundColor:
                  config.levelColors[level - 1] || '#FFFFFF',
              }"
            ></div>
            <div
              class="textdiv"
              :style="{
                height: config.boxHeight + 'px',
                width: config.boxWidth + 'px',
              }"
            >
              <div class="name" v-html="departmentData.name"></div>
              <div v-if="managerNameView" class="name_manager">
                {{ departmentData.manager.name }}
              </div>
            </div>
          </td>
          <td class="drill0">
            <div class="drill">
              <template v-if="departmentData.children.length">
                <ChevronDownIcon
                  v-if="!departmentData.showChildren"
                  class="arrow down"
                  @click.prevent="doShowChildren(true)"
                  @touchend.prevent="doShowChildren(true)"
                />
                <ChevronUpIcon
                  v-if="departmentData.showChildren"
                  class="arrow up"
                  @click.prevent="doShowChildren(false)"
                  @touchend.prevent="doShowChildren(false)"
                />
                <template v-if="showNrDepartments">
                  <div
                    v-if="!departmentData.showChildren"
                    class="hidden_dept down"
                    @click.prevent="doShowChildren(true)"
                    @touchend.prevent="doShowChildren(true)"
                    :title="
                      departmentData.children.length +
                      ' subdepartment' +
                      (departmentData.children.length === 1
                        ? ''
                        : 's') +
                      ' hidden'
                    "
                  >
                    {{ departmentData.children.length }}
                  </div>
                  <div
                    v-if="departmentData.showChildren"
                    class="hidden_dept up"
                    @click.prevent="doShowChildren(false)"
                    @touchend.prevent="doShowChildren(false)"
                    :title="
                      'Hide ' +
                      departmentData.children.length +
                      ' subdepartment' +
                      (departmentData.children.length === 1
                        ? ''
                        : 's')
                    "
                  >
                    {{ departmentData.children.length }}
                  </div>
                </template>
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'

// Props
const props = defineProps({
  departmentData: {
    type: Object,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 0,
  },
  type: {
    type: String,
    default: 'normal',
  },
})

// Store
const store = useOrgChartStore()

// Local state
const mouseOver = ref(false)

// Computed from store
const config = computed(() => store.config)
const activeDepartment = computed(() => store.activeDepartment)
const showNrDepartments = computed(() => store.showNrDepartments)
const showNrPeople = computed(() => store.showNrPeople)
const managerNameView = computed(() => store.managerNameView)
const managerPhotoView = computed(() => store.managerPhotoView)
const editMode = computed(() => store.editMode)
const showEditMenu = computed(() => store.showEditMenu)
const showViewMenu = computed(() => store.showViewMenu)
const moveDepartment = computed(() => store.moveDepartment)

// Computed
const active = computed(() => {
  return (
    activeDepartment.value &&
    activeDepartment.value.id === props.departmentData.id
  )
})

const displaySiblingIcon = computed(() => {
  return (
    props.departmentData.parent &&
    props.departmentData.parent.showParents
  )
})

// Methods
const setActiveDepartment = (department, event) => {
  store.setActiveDepartment(department)

  if (event && event.type === 'contextmenu') {
    event.preventDefault()
    store.setShowEditMenu(event)
  }
}

const showCtxMenu = (department, event) => {
  store.setShowEditMenu(event)
}

const handleShowViewMenu = (department, event) => {
  store.setShowViewMenu(event)
}

const mouseOverBox = (value) => {
  mouseOver.value = value
}

const doShowChildren = (value) => {
  props.departmentData.showChildren = value

  // Принудительно обновляем линии с задержкой для стабилизации DOM
  setTimeout(() => {
    store.forceUpdateLines()
  }, 100)
}

const getInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Debug
onMounted(() => {
  console.log(
    'DeptBox mounted with ID:',
    'ID_' + props.departmentData.id
  )
  console.log('Department data:', props.departmentData)
})
</script>

<style scoped>
.dept-box {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  background-color: white;
  cursor: pointer;
  position: relative;
  width: 200px; /* Статичная ширина */
  min-width: 200px; /* Минимальная ширина */
  max-width: 200px; /* Максимальная ширина */
  pointer-events: auto;
}

.dept-box:hover {
  border-color: #007bff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dept-box.active {
  border-color: #007bff;
  background-color: #f8f9fa;
}

.dept-box table {
  border-collapse: collapse;
}

.dept-box td {
  padding: 2px;
  border: none;
}

.ppl_count0 {
  width: 30px;
}

.ppl_count_nr {
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.initials-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.view-button {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;
}

.view-button:hover {
  color: #007bff;
}

.level_indicator {
  width: 4px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 2px 0 0 2px;
}

.textdiv {
  position: relative;
  padding: 10px;
  text-align: center;
  width: 160px; /* Статичная ширина */
  min-width: 160px; /* Минимальная ширина */
  max-width: 160px; /* Максимальная ширина */
}

.name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.name_manager {
  font-size: 12px;
  color: #666;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.drill {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
}

.arrow {
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #007bff;
  transition: color 0.2s;
}

.arrow:hover {
  color: #0056b3;
}

.arrow.down {
  transform: rotate(0deg);
}

.arrow.up {
  transform: rotate(180deg);
}

.hidden_dept {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  padding: 2px 6px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.hidden_dept:hover {
  background-color: #e9ecef;
  border-color: #adb5bd;
}

.hidden_dept.down {
  color: #28a745;
}

.hidden_dept.up {
  color: #dc3545;
}
</style>
