<template>
  <div v-if="activeDepartment && activeDepartment.id">
    <div class="property">
      <span class="label">{{ uiNames.sidebar.departmentName }}</span>
      <br />
      <input
        v-if="editMode"
        :class="{ error: !activeDepartment_name }"
        v-model="activeDepartment_name"
        class="name"
      />
      <span v-else class="text">{{ activeDepartment_name }}</span>
    </div>

    <div class="property">
      <span class="label">{{
        uiNames.sidebar.departmentManager
      }}</span>
      <i
        v-if="editMode"
        class="material-icons edit"
        @click="personPicker = 'manager'"
      >
        edit
      </i>
      <br />
      <span
        v-if="
          activeDepartment.manager && activeDepartment.manager.name
        "
        class="text"
      >
        {{ activeDepartment.manager.name }}
      </span>
      <span v-else class="untext">No manager</span>
    </div>

    <div class="property">
      <span class="label">{{
        uiNames.sidebar.departmentDescription
      }}</span>
      <br />
      <textarea
        v-if="editMode"
        v-model="activeDepartment_description"
        class="description"
      ></textarea>
      <span
        v-else
        v-html="activeDepartment_description"
        class="text"
      ></span>
    </div>

    <div
      v-for="field in activeDepartment.dataFields || []"
      v-if="field && field.value"
      :key="field.name || field.id"
      class="property"
    >
      <span class="label">{{ field.name }}</span>
      <br />
      <template v-if="editMode">
        <!-- todo edit extra properties -->
      </template>
      <template v-else>
        <template v-if="field.type === 'url'">
          <a :href="field.value" target="_blank">Link</a>
        </template>
        <template v-else>
          <span class="text">{{ field.value }}</span>
        </template>
      </template>
    </div>

    <div class="property">
      <template v-if="!editMode">
        <span class="label">{{
          uiNames.sidebar.departmentType
        }}</span>
        <br />
        <span v-if="activeDepartment_isStaff">
          {{ uiNames.sidebar.departmentTypeStaff }}
        </span>
        <span v-else>
          {{ uiNames.sidebar.departmentTypeNormal }}
        </span>
      </template>
      <template v-else>
        <span class="label">Staff department:</span>
        <input
          type="checkbox"
          v-model="activeDepartment_isStaff"
          :disabled="!editMode"
          class="isstaff"
        />
      </template>
    </div>

    <div class="property">
      <span class="label">{{
        uiNames.sidebar.departmentHierarchy
      }}</span>
      <ul>
        <li
          v-for="(parent, pnr) in parents"
          :key="parent.id"
          class="clickable"
          @click="setActiveDepartment(parent)"
        >
          <span v-for="n in pnr" :key="n">&nbsp;</span>
          <i v-if="pnr !== 0" class="material-icons sub"
            >subdirectory_arrow_right</i
          >
          <span>{{ parent.name }}</span>
        </li>
        <li
          class="clickable"
          @click="setActiveDepartment(activeDepartment)"
        >
          <span v-for="n in parents.length" :key="n">&nbsp;</span>
          <i v-if="parents.length" class="material-icons sub"
            >subdirectory_arrow_right</i
          >
          <span class="this-department">{{
            activeDepartment.name
          }}</span>
        </li>
        <li
          v-for="child in activeDepartment.children || []"
          :key="child.id"
          class="clickable"
          @click="setActiveDepartment(child)"
        >
          <span v-for="n in parents.length + 5" :key="n">&nbsp;</span>
          <span>{{ child.name }}</span>
        </li>
      </ul>
    </div>

    <img
      v-if="
        activeDepartment.manager && activeDepartment.manager.photo
      "
      class="profile"
      :src="
        config.photoUrl.prefix +
        activeDepartment.manager.photo +
        config.photoUrl.suffix
      "
      @click="visitProfile(activeDepartment.manager)"
      title="Goto profile"
    />
    <div
      v-else
      class="material-icons profile nophoto"
      @click="visitProfile(activeDepartment.manager)"
      title="Goto profile"
    >
      face
    </div>

    <person-picker
      v-if="personPicker"
      type="manager"
      @close="personPicker = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'
import PersonPicker from './PersonPicker.vue'

// Store
const store = useOrgChartStore()

// Local state
const personPicker = ref(null)
const activeTab = ref(1)
const noPhotos = ref([])

// Computed from store
const showSideScreen = computed(() => store.showSideScreen)
const activeDepartment = computed(() => {
  const dept = store.activeDepartment
  console.log('DepartmentDetails - activeDepartment:', dept)
  return dept
})
const editMode = computed(() => store.editMode)
const people = computed(() => store.people)
const config = computed(() => store.config)
const uiNames = computed(() => store.uiNames)

// Computed properties
const activeDepartment_name = computed({
  get: () => activeDepartment.value?.name || '',
  set: (val) => {
    if (activeDepartment.value) {
      store.updateActiveDepartmentName(val)
    }
  },
})

const activeDepartment_description = computed({
  get: () => activeDepartment.value?.description || '',
  set: (val) => {
    if (activeDepartment.value) {
      store.updateActiveDepartmentDescription(val)
    }
  },
})

const activeDepartment_isStaff = computed({
  get: () => activeDepartment.value?.isStaff || false,
  set: (val) => {
    if (activeDepartment.value) {
      store.updateActiveDepartmentIsStaff(val)
    }
  },
})

const parents = computed(() => {
  const parents = []
  let department = activeDepartment.value
  while (department && department.parent) {
    department = department.parent
    parents.unshift(department)
  }
  return parents
})

const children = computed(() => {
  return activeDepartment.value?.children || []
})

// Methods
const setActiveDepartment = (department) => {
  store.setShowDepartment(department)
}

const visitProfile = (person) => {
  if (person.name) {
    store.setShowPerson(person)
  }
}
</script>

<style scoped>
.profile {
  width: 80px;
  max-height: 80px;
  min-height: 60px;
  position: absolute;
  right: 16px;
  top: 154px;
  border: 1px solid grey;
  cursor: pointer;
}

.profile:hover {
  border: 2px solid orange;
}

.name {
  font-size: 16px;
}

.property {
  margin-bottom: 20px;
}

.clickable {
  cursor: pointer;
  font-size: 14px;
}

input.name {
  width: calc(100% - 10px);
}

textarea.description {
  width: calc(100% - 10px);
  height: 80px;
}

.clickable:hover {
  background-color: lightblue;
}

.noclickable {
  cursor: default;
}

.label {
  font-weight: 600;
  text-decoration: underline;
}

.untext {
  color: grey;
  font-style: italic;
}

ul {
  list-style: none;
  background-color: white;
  padding: 5px;
}

.this-department {
  font-weight: 600;
}

.sub {
  font-size: 16px;
  margin: -8px 0px;
}

.isstaff {
  margin: 0px 10px;
}

.material-icons.edit {
  font-size: 16px;
  cursor: pointer;
}

.nophoto {
  font-size: 80px;
  color: lightgrey;
}
</style>
