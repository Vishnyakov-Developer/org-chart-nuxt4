<template>
  <div
    class="dept-box"
    :class="[type, active]"
    :id="'ID_' + departmentData.id"
    @click="setActiveDepartment(departmentData, $event)"
    @touchend="setActiveDepartment(departmentData, $event)"
    @contextmenu.prevent="showCtxMenu(departmentData, $event)"
    @mouseenter="mouseOverBox(true)"
    @mouseleave="mouseOverBox(false)"
  >
    <i
      v-if="displaySiblingIcon"
      class="material-icons view_button"
      @click="showViewMenu(departmentData, $event)"
      title="Show/hide parents"
    >
      visibility
    </i>

    <table>
      <tbody>
        <tr>
          <td class="ppl_count0">
            <div v-if="showNrPeople" class="ppl_count">
              <div
                v-if="departmentData.employees.length"
                class="ppl_count_nr"
                :title="
                  departmentData.employees.length +
                  (departmentData.employees.length === 1
                    ? ' person in this department'
                    : ' people in this department')
                "
              >
                {{ departmentData.employees.length }}
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
            <div v-else class="material-icons nophoto">face</div>
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
                <i
                  v-if="!departmentData.showChildren"
                  class="material-icons arrow down"
                  @click.prevent="doShowChildren(true)"
                  @touchend.prevent="doShowChildren(true)"
                >
                  arrow_drop_down
                </i>
                <i
                  v-if="departmentData.showChildren"
                  class="material-icons arrow up"
                  @click.prevent="doShowChildren(false)"
                  @touchend.prevent="doShowChildren(false)"
                >
                  arrow_drop_up
                </i>
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
                        : 's')
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
import { computed } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'

// Props
const props = defineProps({
  departmentData: {
    type: Object,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  type: {
    type: String,
    default: 'normal',
  },
})

// Store
const store = useOrgChartStore()

// Computed from store
const config = computed(() => store.config)
const managerNameView = computed(() => store.managerNameView)
const managerPhotoView = computed(() => store.managerPhotoView)
const showNrPeople = computed(() => store.showNrPeople)
const showNrDepartments = computed(() => store.showNrDepartments)
const activeDepartment = computed(() => store.activeDepartment)

// Computed
const active = computed(() => {
  return activeDepartment.value &&
    activeDepartment.value.id === props.departmentData.id
    ? 'active'
    : ''
})

const displaySiblingIcon = computed(() => {
  return (
    props.departmentData.parent &&
    props.departmentData.parent.children.length > 1
  )
})

// Methods
const setActiveDepartment = (dept, event) => {
  store.setActiveDepartment(dept)
}

const showCtxMenu = (dept, event) => {
  // Context menu logic
}

const mouseOverBox = (isOver) => {
  // Mouse over logic
}

const showViewMenu = (dept, event) => {
  // View menu logic
}

const doShowChildren = (show) => {
  props.departmentData.showChildren = show
}
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
  min-width: 150px;
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

.nophoto {
  width: 40px;
  height: 40px;
  font-size: 40px;
  color: #ccc;
}

.level_indicator {
  width: 4px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.textdiv {
  padding: 5px;
  text-align: center;
}

.name {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 2px;
}

.name_manager {
  font-size: 12px;
  color: #666;
}

.drill0 {
  width: 30px;
}

.arrow {
  cursor: pointer;
  font-size: 20px;
  color: #007bff;
}

.hidden_dept {
  font-size: 12px;
  color: #666;
  cursor: pointer;
}

.view_button {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
}

.view_button:hover {
  color: #007bff;
}
</style>
