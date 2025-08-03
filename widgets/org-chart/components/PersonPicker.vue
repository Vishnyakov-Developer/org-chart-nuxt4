<template>
  <div class="person-picker-overlay" @click="close">
    <div class="person-picker" @click.stop>
      <div class="header">
        <h3>{{ type === 'manager' ? 'Select Manager' : 'Select Person' }}</h3>
        <button class="close-btn" @click="close">×</button>
      </div>
      
      <div class="search-section">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search people..."
          class="search-input"
        />
      </div>
      
      <div class="people-list">
        <div 
          v-for="person in filteredPeople" 
          :key="person.id"
          class="person-item"
          :class="{ selected: selectedPerson && selectedPerson.id === person.id }"
          @click="selectPerson(person)"
        >
          <div class="person-info">
            <div class="person-name">{{ person.name }}</div>
            <div v-if="person.functionName" class="person-function">{{ person.functionName }}</div>
          </div>
          <div v-if="person.photo" class="person-photo">
            <img :src="config.photoUrl.prefix + person.photo + config.photoUrl.suffix" />
          </div>
          <div v-else class="person-photo-placeholder">
            <i class="material-icons">face</i>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <button @click="close" class="cancel-btn">Cancel</button>
        <button @click="confirmSelection" class="confirm-btn" :disabled="!selectedPerson">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'

// Props
const props = defineProps({
  type: {
    type: String,
    default: 'person'
  }
})

// Emits
const emit = defineEmits(['close'])

// Store
const store = useOrgChartStore()

// Local state
const searchQuery = ref('')
const selectedPerson = ref(null)

// Computed from store
const people = computed(() => store.people)
const config = computed(() => store.config)
const activeDepartment = computed(() => store.activeDepartment)

// Computed
const filteredPeople = computed(() => {
  if (!searchQuery.value) return people.value
  
  const query = searchQuery.value.toLowerCase()
  return people.value.filter(person => 
    person.name.toLowerCase().includes(query) ||
    (person.functionName && person.functionName.toLowerCase().includes(query))
  )
})

// Methods
const selectPerson = (person) => {
  selectedPerson.value = person
}

const confirmSelection = () => {
  if (!selectedPerson.value) return
  
  if (props.type === 'manager' && activeDepartment.value) {
    // Обновляем менеджера департамента
    activeDepartment.value.manager = selectedPerson.value
  } else {
    // Добавляем человека в департамент
    if (activeDepartment.value && activeDepartment.value.employees) {
      activeDepartment.value.employees.push(selectedPerson.value)
    }
  }
  
  close()
}

const close = () => {
  selectedPerson.value = null
  searchQuery.value = ''
  emit('close')
}

// Lifecycle
onMounted(() => {
  // Можно добавить дополнительную логику инициализации
})
</script>

<style scoped>
.person-picker-overlay {
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

.person-picker {
  background: white;
  border-radius: 8px;
  width: 500px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.header h3 {
  margin: 0;
  font-size: 18px;
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

.search-section {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.people-list {
  flex: 1;
  overflow-y: auto;
  max-height: 400px;
}

.person-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background-color 0.2s;
}

.person-item:hover {
  background-color: #f9f9f9;
}

.person-item.selected {
  background-color: #e3f2fd;
}

.person-info {
  flex: 1;
}

.person-name {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4px;
}

.person-function {
  font-size: 12px;
  color: #666;
}

.person-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 15px;
}

.person-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.person-photo-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
}

.person-photo-placeholder i {
  font-size: 20px;
  color: #999;
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #eee;
}

.cancel-btn, .confirm-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.cancel-btn {
  background: #f5f5f5;
  color: #333;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.confirm-btn {
  background: #2196f3;
  color: white;
}

.confirm-btn:hover:not(:disabled) {
  background: #1976d2;
}

.confirm-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
