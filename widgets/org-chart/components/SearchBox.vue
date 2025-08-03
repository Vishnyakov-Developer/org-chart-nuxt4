<template>
  <div class="search-box">
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search departments or people..."
        class="search-input"
        @keyup.enter="performSearch"
      />
      <button @click="performSearch" class="search-btn">
        <i class="material-icons">search</i>
      </button>
    </div>

    <div v-if="searchResults.length > 0" class="search-results">
      <div
        v-for="result in searchResults"
        :key="result.id"
        class="search-result-item"
        @click="selectResult(result)"
      >
        <div class="result-name">{{ result.name }}</div>
        <div v-if="result.type" class="result-type">
          {{ result.type }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'

// Store
const store = useOrgChartStore()

// Local state
const searchQuery = ref('')

// Computed from store
const chart = computed(() => store.chart)
const editMode = computed(() => store.editMode)
const orgArray = computed(() => store.orgArray)
const config = computed(() => store.config)
const people = computed(() => store.people)

// Computed
const searchResults = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) {
    return []
  }

  const query = searchQuery.value.toLowerCase()
  const results = []

  // Поиск в департаментах
  const searchInDepartments = (dept) => {
    if (dept.name.toLowerCase().includes(query)) {
      results.push({
        id: dept.id,
        name: dept.name,
        type: 'Department',
        department: dept,
      })
    }

    if (dept.children) {
      dept.children.forEach(searchInDepartments)
    }
  }

  if (chart.value) {
    searchInDepartments(chart.value)
  }

  // Поиск в людях
  people.value.forEach((person) => {
    if (person.name.toLowerCase().includes(query)) {
      results.push({
        id: person.id,
        name: person.name,
        type: 'Person',
        person: person,
      })
    }
  })

  return results.slice(0, 10) // Ограничиваем до 10 результатов
})

// Methods
const performSearch = () => {
  if (searchResults.value.length === 1) {
    selectResult(searchResults.value[0])
  }
}

const selectResult = (result) => {
  if (result.department) {
    store.setShowDepartment(result.department)
  } else if (result.person) {
    store.setShowPerson(result.person)
  }

  searchQuery.value = ''
}

const toggleEditMode = () => {
  store.setEditMode(!editMode.value)
}
</script>

<style scoped>
.search-box {
  position: relative;
  display: inline-block;
}

.search-container {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: none;
  outline: none;
  font-size: 14px;
  min-width: 200px;
}

.search-btn {
  padding: 8px 12px;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.search-btn:hover {
  background: #e0e0e0;
}

.search-btn i {
  font-size: 18px;
  color: #666;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-result-item {
  padding: 10px 12px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
}

.search-result-item:hover {
  background-color: #f5f5f5;
}

.search-result-item:last-child {
  border-bottom: none;
}

.result-name {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 2px;
}

.result-type {
  font-size: 12px;
  color: #666;
}
</style>
