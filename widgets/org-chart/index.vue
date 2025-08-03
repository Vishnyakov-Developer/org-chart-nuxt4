<template>
  <div class="p-container" @mousemove="onMouseMove">
    <div id="xparent" class="container1">
      <org-chart v-if="chart" />
    </div>
    <edit-menu v-if="showEditMenu" />
    <div
      v-if="moveDepartment"
      id="move_dept"
      :style="{ left: page.left + 'px', top: page.top + 'px' }"
    >
      <div>{{ moveDepartment.name }}</div>
      <i
        v-if="moveDepartment.children.length"
        class="material-icons arrow down"
        >arrow_drop_down</i
      >
    </div>
    <show-person v-if="showPerson" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrgChartStore } from './stores/orgChart'

// Components
import OrgChart from './components/OrgChart.vue'
import EditMenu from './components/EditMenu.vue'
import ShowPerson from './components/ShowPerson.vue'

// Store
const store = useOrgChartStore()

// Router
const route = useRoute()
const router = useRouter()

// Local state
const page = ref({ left: 0, top: 0 })

// Computed from store
const chart = computed(() => store.chart)
const activeDepartment = computed(() => store.activeDepartment)
const onlyShowParents = computed(() => store.onlyShowParents)
const showEditMenu = computed(() => store.showEditMenu)
const moveDepartment = computed(() => store.moveDepartment)
const showPerson = computed(() => store.showPerson)

// Computed URL params
const urlParam = computed(() => {
  if (showPerson.value) {
    return { employee: showPerson.value.id }
  }
  if (!activeDepartment.value) {
    return null
  }

  let parents
  if (!activeDepartment.value.showParents) {
    parents = 'hide'
  } else if (onlyShowParents.value) {
    parents = 'only'
  } else {
    parents = 'all'
  }

  const children = activeDepartment.value.showChildren
    ? 'show'
    : 'hide'

  return {
    dept: activeDepartment.value.id,
    parents: parents,
    children: children,
  }
})

// Watchers
watch(urlParam, (qry) => {
  setUrl(qry)
})

// Methods
const onMouseMove = (e) => {
  const chartpos = document
    .getElementById('chart')
    ?.getBoundingClientRect()
  if (chartpos) {
    page.value.left = e.clientX - 0 * chartpos.left + 10
    page.value.top = e.clientY - 0 * chartpos.top + 10
  }
}

const setUrl = (qry) => {
  router.push({ path: route.path, query: qry })
}

const getUrl = (qry) => {
  if (qry && qry.employee) {
    console.log(qry.employee)
    store.setActiveEmployeeById(qry.employee)
    return
  }

  if (qry && qry.dept) {
    store.setActiveDepartmentById(qry.dept)
    if (qry.parents === 'hide') {
      store.setHideParents(true)
    } else if (qry.parents === 'only') {
      store.setOnlyShowParents(true)
      store.setActiveDepartmentById(qry.dept)
    }
  }

  if (activeDepartment.value && qry.children === 'show') {
    store.showChildren(activeDepartment.value)
  }

  if (!activeDepartment.value) {
    router.push({ path: route.path, query: null })
  }
}

// Lifecycle
onMounted(() => {
  console.log('OrgChartWidget mounted')

  // Инициализируем store
  store.initializeStore()

  // Устанавливаем активный департамент
  if (store.chart) {
    activeDepartment.value = store.chart
    console.log('Active department set to:', activeDepartment.value)
  }
})
</script>

<style scoped>
*:focus {
  outline: 0;
}

body {
  background-color: white;
  overflow: hidden;
}

#move_dept {
  position: absolute;
  width: 114px;
  height: 50px;
  margin: 4px 10px;
  text-align: center;
  font-size: 11px;
  vertical-align: middle;
  display: flex;
  border-radius: 3px;
  align-items: center;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  padding: 2px 2px;
  box-sizing: border-box;
  top: 0px;
  left: 0px;
  border: 1px dashed #006696;
}

.p-container {
  width: 80dvw;
  height: 100%;
  overflow: hidden;
  border: 1px solid red;
  position: relative;
}

.container1 {
  position: relative;

  width: 16000px;
  height: calc(100% - 60px);
  overflow: hidden;
  background: white;
  transform-origin: 0 0;
}
</style>
