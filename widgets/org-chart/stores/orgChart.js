import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import panzoom from 'panzoom'
import _ from 'lodash'

// Глобальные переменные (будут загружены из внешних файлов)
let CONFIG = {
  photoUrl: {
    prefix: '',
    suffix: ''
  },
  levelColors: ['#FFFFFF', '#F0F0F0', '#E0E0E0'],
  boxHeight: 60,
  boxWidth: 200
}
let UPDATED_ON = '2025-08-03'
let UINAMES = {
  sidebar: {
    managerOfDepartment: 'Manager',
    detailTabName: 'Details',
    peopleTabName: 'People',
    departmentName: 'Department Name',
    departmentManager: 'Department Manager',
    departmentDescription: 'Description',
    departmentType: 'Department Type',
    departmentTypeStaff: 'Staff Department',
    departmentTypeNormal: 'Regular Department',
    departmentHierarchy: 'Hierarchy'
  }
}
let INPUT_DATA = {
  api_version: '2.0',
  chart: {
    id: '1',
    name: 'Test Company',
    manager: {
      id: '1',
      name: 'CEO',
      photo: null
    },
    children: [
      {
        id: '2',
        name: 'Engineering',
        manager: {
          id: '2',
          name: 'CTO',
          photo: null
        },
        children: [
          {
            id: '3',
            name: 'Frontend',
            manager: {
              id: '3',
              name: 'Frontend Lead',
              photo: null
            },
            children: [],
            employees: [],
            showChildren: false,
            showParents: true,
            dataFields: []
          },
          {
            id: '4',
            name: 'Backend',
            manager: {
              id: '4',
              name: 'Backend Lead',
              photo: null
            },
            children: [],
            employees: [],
            showChildren: false,
            showParents: true,
            dataFields: []
          }
        ],
        employees: [],
        showChildren: false,
        showParents: true,
        dataFields: []
      },
      {
        id: '5',
        name: 'Marketing',
        manager: {
          id: '5',
          name: 'CMO',
          photo: null
        },
        children: [],
        employees: [],
        showChildren: false,
        showParents: true,
        dataFields: []
      }
    ],
    employees: [],
    showChildren: false,
    showParents: true,
    dataFields: []
  },
  people: [],
  assignments: []
}

export const useOrgChartStore = defineStore('orgChart', () => {
  // State
  const config = ref(CONFIG)
  const updatedOn = ref(UPDATED_ON)
  const uiNames = ref(UINAMES)
  const chart = ref(INPUT_DATA.chart)
  const people = ref([])
  const assignments = ref([])
  const orgArray = ref(null)
  const lines = ref([])
  const showSideScreen = ref(true)
  const columnView = ref(true)
  const columnView_noStaff = ref(true)
  const managerNameView = ref(true)
  const managerPhotoView = ref(true)
  const activeDepartment = ref(null)
  const moveDepartment = ref(null)
  const editMode = ref(false)
  const showEditMenu = ref(null)
  const showViewMenu = ref(null)
  const selectedPerson = ref(null)
  const onlyShowParents = ref(false)
  const zoomInstance = ref(null)
  const showNrDepartments = ref(true)
  const showNrPeople = ref(true)
  const showPerson = ref(null)

  const defaultPersonProperties = ref([
    { name: 'Email', type: 'email', order: 0 },
    { name: 'Phone', type: 'text', order: 1 },
    { name: 'Homepage', type: 'url', order: 2 },
    { name: 'Country', type: 'text', order: 3 },
    { name: 'City', type: 'text', order: 4 },
    { name: 'Street', type: 'text', order: 5 }
  ])

  // Computed
  const isDepartmentVisible = computed(() => (dept) => {
    if (!dept) return false
    if (dept.showDepartment === false) return false
    if (dept.hideDepartment === true) return false
    return true
  })

  // Actions
  const initStore = (dept) => {
    setConfig()
    console.log(CONFIG, config.value)

    // Устанавливаем начальное значение для activeDepartment
    if (!activeDepartment.value) {
      setActiveDepartment(chart.value)
    }

    let data
    let peopleData

    // check if the data is saved in old format (array) or new format (tree)
    if (!INPUT_DATA.api_version) {
      data = processData()
      createTree(data)
      console.log('Loading OLD input data format')
    } else if (INPUT_DATA.api_version === '1.0') {
      data = processData10(INPUT_DATA.chart, [])
      peopleData = processPeople10(INPUT_DATA.people)
      createTree1(data)
      console.log('Loading 1.0 input data format')
    } else if (INPUT_DATA.api_version === '2.0') {
      data = processData10(INPUT_DATA.chart, [])
      peopleData = processPeople10(INPUT_DATA.people)
      createTree1(data)
      console.log('Loading 2.0 input data format')
    } else {
      alert('wrong version input file')
    }

    processAssignments({
      departments: data.orgArray,
      people: peopleData,
      assignments: INPUT_DATA.assignments
    })
    setPeople(peopleData)
    setAssignments(INPUT_DATA.assignments)

    // Setup event listeners
    window.onresize = () => {
      refreshLines()
    }

    document.body.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        cancelAll()
        setActiveDepartment(null)
      }
    })

    setEditMode(false)
  }

  const initZoom = (dept) => {
    const area = document.querySelector('#chart')
    if (!area) {
      console.warn('Chart element not found')
      return
    }

    if (zoomInstance.value) zoomInstance.value.dispose()

    try {
      const instance = panzoom(area, {
        smoothScroll: false,
        maxZoom: 2,
        minZoom: 0.2
      })

      setTimeout(() => {
        let pos
        if (dept) {
          pos = getPosOfElement(dept)
          instance.moveTo(pos.x, pos.y)
          instance.zoomTo(1)
        } else {
          instance.moveTo(0, 0)
          instance.zoomTo(1)
        }
      }, 100)

      zoomInstance.value = instance
    } catch (error) {
      console.warn('Panzoom initialization failed:', error)
    }
  }

  // Mutations (теперь это обычные функции)
  const setConfig = () => {
    config.value = CONFIG
  }

  const setConfigUpdate = ({ prop, subProp = null, val } = {}) => {
    if (subProp) {
      config.value[prop][subProp] = val
    } else {
      config.value[prop] = val
    }
  }

  const setPeople = (data) => {
    people.value = data
  }

  const setAssignments = (data) => {
    assignments.value = data
  }

  const setActiveDepartment = (dept) => {
    console.log('Setting active department:', dept)
    activeDepartment.value = dept
    console.log('Active department set to:', activeDepartment.value)
  }

  const setActiveDepartmentById = (deptId) => {
    const dept = findDept(chart.value, deptId)
    if (dept) {
      setActiveDepartment(dept)
    }
  }

  const setActiveEmployeeById = (empId) => {
    const person = people.value.find(p => p.id === empId)
    if (person) {
      setShowPerson(person)
    }
  }

  const setShowPerson = (person) => {
    showPerson.value = person
  }

  const setEditMode = (value) => {
    editMode.value = value
  }

  const setShowEditMenu = (event) => {
    showEditMenu.value = event
  }

  const setShowViewMenu = (event) => {
    showViewMenu.value = event
  }

  const setMoveDepartment = () => {
    moveDepartment.value = activeDepartment.value
  }

  const cancelMoveDepartment = () => {
    moveDepartment.value = null
  }

  const cancelAll = () => {
    showEditMenu.value = null
    showViewMenu.value = null
    selectedPerson.value = null
    moveDepartment.value = null
  }

  const setZoomInstance = (val) => {
    zoomInstance.value = val
  }

  const resetZoom = () => {
    if (zoomInstance.value) {
      zoomInstance.value.moveTo(0, 0)
      zoomInstance.value.zoomTo(1)
    }
  }

  const addLine = () => {
    // Добавляем линию для соединения элементов
    lines.value.push({})
  }

  const setHideParents = (value) => {
    if (activeDepartment.value) {
      activeDepartment.value.showParents = !value
    }
  }

  const setOnlyShowParents = (value) => {
    onlyShowParents.value = value
  }

  const showChildren = (dept) => {
    if (dept) {
      dept.showChildren = true
    }
  }

  // Методы для работы с назначениями
  const removeAssignment = ({ department, assignment }) => {
    if (department && department.employees) {
      const index = department.employees.findIndex(emp => emp === assignment)
      if (index > -1) {
        department.employees.splice(index, 1)
      }
    }
  }

  const updateRole = ({ assignment, department, role }) => {
    if (assignment) {
      assignment.role = role
    }
  }

  // Методы для боковой панели
  const closeSideScreen = () => {
    showSideScreen.value = false
  }

  const openSideScreen = () => {
    showSideScreen.value = true
  }

  // Дополнительные методы для DepartmentDetails
  const updateActiveDepartmentName = (name) => {
    if (activeDepartment.value) {
      activeDepartment.value.name = name
    }
  }

  const updateActiveDepartmentDescription = (description) => {
    if (activeDepartment.value) {
      activeDepartment.value.description = description
    }
  }

  const updateActiveDepartmentIsStaff = (isStaff) => {
    if (activeDepartment.value) {
      activeDepartment.value.isStaff = isStaff
    }
  }

  const setShowDepartment = (department) => {
    setActiveDepartment(department)
  }

  // Helper functions
  const processData = () => {
    // Implementation from original store
    return []
  }

  const processData10 = (dept, orgArray) => {
    // Implementation from original store
    return { orgArray: [] }
  }

  const processPeople10 = (people) => {
    // Implementation from original store
    return []
  }

  const processPeople20 = (people) => {
    // Implementation from original store
    return []
  }

  const createTree = (data) => {
    // Implementation from original store
  }

  const createTree1 = (data) => {
    // Implementation from original store
  }

  const processAssignments = ({ departments, people, assignments }) => {
    // Implementation from original store
  }

  const refreshLines = () => {
    // Implementation from original store
  }

  const getPosOfElement = (dept) => {
    // Implementation from original store
    return { x: 0, y: 0 }
  }

  const findDept = (chart, deptId) => {
    if (!chart) return null
    if (chart.id === deptId) return chart
    if (chart.children) {
      for (const child of chart.children) {
        const found = findDept(child, deptId)
        if (found) return found
      }
    }
    return null
  }

  return {
    // State
    config,
    updatedOn,
    uiNames,
    chart,
    people,
    assignments,
    orgArray,
    lines,
    showSideScreen,
    columnView,
    columnView_noStaff,
    managerNameView,
    managerPhotoView,
    activeDepartment,
    moveDepartment,
    editMode,
    showEditMenu,
    showViewMenu,
    selectedPerson,
    onlyShowParents,
    zoomInstance,
    showNrDepartments,
    showNrPeople,
    showPerson,
    defaultPersonProperties,

    // Computed
    isDepartmentVisible,

    // Actions
    initStore,
    initZoom,

    // Mutations
    setConfig,
    setConfigUpdate,
    setPeople,
    setAssignments,
    setActiveDepartment,
    setActiveDepartmentById,
    setActiveEmployeeById,
    setShowPerson,
    setEditMode,
    setShowEditMenu,
    setShowViewMenu,
    setMoveDepartment,
    cancelMoveDepartment,
    cancelAll,
    setZoomInstance,
    resetZoom,
    addLine,
    setHideParents,
    setOnlyShowParents,
    showChildren,
    removeAssignment,
    updateRole,
    closeSideScreen,
    openSideScreen,
    updateActiveDepartmentName,
    updateActiveDepartmentDescription,
    updateActiveDepartmentIsStaff,
    setShowDepartment
  }
}) 