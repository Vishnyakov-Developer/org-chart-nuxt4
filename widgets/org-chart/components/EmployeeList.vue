<template>
  <div>
    <!-- manager -->
    <div
      class="assignment"
      @click="visitProfile(activeDepartment.manager)"
      title="Goto profile"
    >
      <table>
        <tbody>
          <tr>
            <td>
              <img
                v-if="photoURL(activeDepartment.manager)"
                :src="photoURL(activeDepartment.manager)"
                class="photo"
                @error="markPhotoNotFound(activeDepartment.manager)"
              />
              <div v-else class="material-icons nophoto">face</div>
            </td>
            <td>
              <div class="name">
                <span>{{ activeDepartment.manager.name }}</span>
              </div>
              <div class="manager_role">
                {{ uiNames.sidebar.managerOfDepartment }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="hspace"></div>

    <div
      v-if="activeDepartment.employees.length === 0"
      class="nopeople"
    >
      <span>No employees</span>
    </div>

    <template v-else>
      <!-- employees -->
      <div
        v-for="(person, p_idx) in activeDepartment.employees"
        :key="person.person.id"
        class="assignment"
        @click="visitProfile(person.person)"
        title="Goto profile"
      >
        <table>
          <tbody>
            <tr>
              <td>
                <img
                  v-if="photoURL(person.person)"
                  :src="photoURL(person.person)"
                  class="photo"
                  @error="markPhotoNotFound(person)"
                />
                <div v-else class="material-icons nophoto">face</div>
              </td>
              <td>
                <div class="name">
                  <span>{{ person.person.name }}</span>
                </div>
                <div v-if="!editMode" class="role">
                  {{ person.role }}
                </div>
                <div v-else class="role">
                  <input
                    :value="person.role"
                    @input="updateThisRole(person, $event)"
                    @click.stop
                    title="Edit role"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <template v-if="editMode">
          <i
            class="material-icons delete"
            title="remove from department"
            @click.stop="removeDeptAssignment(person)"
          >
            delete
          </i>
        </template>
      </div>
    </template>

    <button
      v-if="editMode"
      class="btn"
      @click="personPicker = 'person'"
    >
      Add person
    </button>

    <person-picker
      v-if="personPicker"
      :type="personPicker"
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
const noPhotos = ref([])

// Computed from store
const activeDepartment = computed(() => store.activeDepartment)
const editMode = computed(() => store.editMode)
const people = computed(() => store.people)
const config = computed(() => store.config)
const uiNames = computed(() => store.uiNames)

// Methods
const markPhotoNotFound = (person) => {
  if (!noPhotos.value.find((p) => p.person === person)) {
    noPhotos.value.push(person)
  }
}

const photoURL = (person) => {
  if (!person.photo) return null
  return (
    config.value.photoUrl.prefix +
    person.photo +
    config.value.photoUrl.suffix
  )
}

const removeDeptAssignment = (assignment) => {
  store.removeAssignment({
    department: activeDepartment.value,
    assignment: assignment,
  })
}

const updateThisRole = (person, e) => {
  store.updateRole({
    assignment: person,
    department: activeDepartment.value,
    role: e.target.value,
  })
}

const visitProfile = (person) => {
  store.setShowPerson(person)
}
</script>

<style scoped>
.assignment {
  width: 90%;
  height: 60px;
  margin: 4px auto;
  position: relative;
  border: 1px solid lightgrey;
  background-color: white;
  cursor: pointer;
}

.assignment:hover {
  border: 2px solid orange;
}

.photo {
  width: 52px;
  max-height: 52px;
  display: block;
  margin: auto;
}

.name {
  font-size: 16px;
}

.role {
  color: grey;
  font-size: 14px;
}

.manager_role {
  color: white;
  background-color: grey;
  font-size: 14px;
  padding: 0px 10px;
}

.delete {
  position: absolute;
  top: 5px;
  right: 0px;
  font-size: 20px;
  color: red;
  cursor: pointer;
}

input.name {
  width: calc(100% - 10px);
}

textarea.description {
  width: calc(100% - 10px);
  height: 80px;
}

.noclickable {
  cursor: default;
}

ul {
  list-style: none;
  background-color: white;
  padding: 5px;
}

.btn {
  cursor: pointer;
}

.nopeople {
  width: 100%;
  text-align: center;
  font-style: italic;
}

.nophoto {
  font-size: 52px;
  color: lightgrey;
}

.hspace {
  height: 10px;
}
</style>
