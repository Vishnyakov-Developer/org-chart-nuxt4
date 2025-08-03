<template>
  <div v-if="showPerson" class="person-modal-overlay" @click="close">
    <div class="person-modal" @click.stop>
      <div class="modal-header">
        <h2>{{ showPerson.name }}</h2>
        <button class="close-btn" @click="close">×</button>
      </div>

      <div class="modal-content">
        <div class="person-photo-section">
          <img
            v-if="showPerson.photo"
            :src="
              config.photoUrl.prefix +
              showPerson.photo +
              config.photoUrl.suffix
            "
            class="person-photo"
            alt="Person photo"
          />
          <div v-else class="person-photo-placeholder">
            <i class="material-icons">face</i>
          </div>
        </div>

        <div class="person-details">
          <div class="detail-group">
            <label>Name:</label>
            <input
              v-if="editMode"
              v-model="personName"
              class="detail-input"
            />
            <span v-else class="detail-text">{{
              showPerson.name
            }}</span>
          </div>

          <div class="detail-group">
            <label>Function:</label>
            <input
              v-if="editMode"
              v-model="personFunction"
              class="detail-input"
            />
            <span v-else class="detail-text">{{
              showPerson.functionName || 'Not specified'
            }}</span>
          </div>

          <div
            v-for="field in defaultPersonProperties"
            :key="field.name"
            class="detail-group"
          >
            <label>{{ field.name }}:</label>
            <input
              v-if="editMode"
              v-model="personFields[field.name]"
              :type="field.type"
              class="detail-input"
            />
            <span v-else class="detail-text">
              {{ personFields[field.name] || 'Not specified' }}
            </span>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button v-if="editMode" @click="saveChanges" class="save-btn">
          Save Changes
        </button>
        <button v-else @click="toggleEditMode" class="edit-btn">
          Edit
        </button>
        <button @click="close" class="cancel-btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'

// Store
const store = useOrgChartStore()

// Local state
const personName = ref('')
const personFunction = ref('')
const personFields = ref({})

// Computed from store
const showPerson = computed(() => store.showPerson)
const editMode = computed(() => store.editMode)
const config = computed(() => store.config)
const defaultPersonProperties = computed(
  () => store.defaultPersonProperties
)

// Watchers
watch(
  showPerson,
  (newPerson) => {
    if (newPerson) {
      personName.value = newPerson.name || ''
      personFunction.value = newPerson.functionName || ''

      // Инициализируем поля
      defaultPersonProperties.value.forEach((prop) => {
        personFields.value[prop.name] =
          newPerson.fields?.[prop.name] || ''
      })
    }
  },
  { immediate: true }
)

// Methods
const close = () => {
  store.setShowPerson(null)
}

const toggleEditMode = () => {
  store.setEditMode(true)
}

const saveChanges = () => {
  if (showPerson.value) {
    showPerson.value.name = personName.value
    showPerson.value.functionName = personFunction.value
    showPerson.value.fields = { ...personFields.value }
  }
  store.setEditMode(false)
}
</script>

<style scoped>
.person-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.person-modal {
  background: white;
  border-radius: 8px;
  width: 500px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #333;
}

.modal-content {
  padding: 20px;
  display: flex;
  gap: 20px;
}

.person-photo-section {
  flex-shrink: 0;
}

.person-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #eee;
}

.person-photo-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #eee;
}

.person-photo-placeholder i {
  font-size: 60px;
  color: #999;
}

.person-details {
  flex: 1;
}

.detail-group {
  margin-bottom: 15px;
}

.detail-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
  color: #333;
}

.detail-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.detail-input:focus {
  outline: none;
  border-color: #2196f3;
}

.detail-text {
  font-size: 14px;
  color: #666;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #eee;
}

.save-btn,
.edit-btn,
.cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.save-btn {
  background: #4caf50;
  color: white;
}

.save-btn:hover {
  background: #45a049;
}

.edit-btn {
  background: #2196f3;
  color: white;
}

.edit-btn:hover {
  background: #1976d2;
}

.cancel-btn {
  background: #f5f5f5;
  color: #333;
}

.cancel-btn:hover {
  background: #e0e0e0;
}
</style>
