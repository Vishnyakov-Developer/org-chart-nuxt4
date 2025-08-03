import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as panzoomModule from 'panzoom'
import _ from 'lodash'

// Проверяем импорт panzoom
const panzoom = panzoomModule.default || panzoomModule
console.log('Panzoom import check:', {
  panzoomModule,
  panzoom,
  type: typeof panzoom
})

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
// Тестовые данные
const INPUT_DATA = ref({
  api_version: '2.0',
  chart: {
    id: '1',
    name: 'Директор подразделения',
    description: 'Руководитель всего подразделения',
    manager: {
      name: 'Иванков Игорь Валерьевич',
      title: 'Директор',
      photo: null
    },
    children: [
      {
        id: '2',
        name: 'Зам. по механизации',
        description: 'Заместитель по механизации',
        manager: {
          name: 'Гусаров Сергей Петрович',
          title: 'Заместитель',
          photo: null
        },
        children: [
          {
            id: '2_1',
            name: 'Отдел механики 1',
            description: 'Первый отдел механики',
            manager: {
              name: 'Александр Александрович Александров',
              title: 'Начальник отдела',
              photo: null
            },
            children: [],
            showChildren: false,
            showParents: false,
            isStaff: false,
            parent: null
          },
          {
            id: '2_2',
            name: 'Отдел механики 2',
            description: 'Второй отдел механики',
            manager: {
              name: 'Борис Борисович Борисов',
              title: 'Начальник отдела',
              photo: null
            },
            children: [],
            showChildren: false,
            showParents: false,
            isStaff: false,
            parent: null
          },
          {
            id: '2_3',
            name: 'Отдел механики 3',
            description: 'Третий отдел механики',
            manager: {
              name: 'Владимир Владимирович Владимиров',
              title: 'Начальник отдела',
              photo: null
            },
            children: [],
            showChildren: false,
            showParents: false,
            isStaff: false,
            parent: null
          }
        ],
        showChildren: true,
        showParents: false,
        isStaff: false,
        parent: null
      },
      {
        id: '3',
        name: 'Главный инженер',
        description: 'Главный инженер подразделения',
        manager: {
          name: 'Иван Алексеевич Павлов',
          title: 'Главный инженер',
          photo: null
        },
        children: [
          {
            id: '4',
            name: 'Охрана труда - Группа 1',
            description: 'Группа охраны труда 1',
            manager: {
              name: 'Георгий Георгиевич Георгиев',
              title: 'Руководитель группы',
              photo: null
            },
            children: [
              {
                id: '4_1',
                name: 'Подгруппа 1.1',
                description: 'Первая подгруппа',
                manager: {
                  name: 'Дмитрий Дмитриевич Дмитриев',
                  title: 'Руководитель подгруппы',
                  photo: null
                },
                children: [],
                showChildren: false,
                showParents: false,
                isStaff: false,
                parent: null
              },
              {
                id: '4_2',
                name: 'Подгруппа 1.2',
                description: 'Вторая подгруппа',
                manager: {
                  name: 'Евгений Евгеньевич Евгеньев',
                  title: 'Руководитель подгруппы',
                  photo: null
                },
                children: [],
                showChildren: false,
                showParents: false,
                isStaff: false,
                parent: null
              }
            ],
            showChildren: true,
            showParents: false,
            isStaff: false,
            parent: null
          },
          {
            id: '5',
            name: 'Охрана труда - Группа 2',
            description: 'Группа охраны труда 2',
            manager: {
              name: 'Фёдор Фёдорович Фёдоров',
              title: 'Руководитель группы',
              photo: null
            },
            children: [
              {
                id: '5_1',
                name: 'Подгруппа 2.1',
                description: 'Первая подгруппа',
                manager: {
                  name: 'Захар Захарович Захаров',
                  title: 'Руководитель подгруппы',
                  photo: null
                },
                children: [],
                showChildren: false,
                showParents: false,
                isStaff: false,
                parent: null
              },
              {
                id: '5_2',
                name: 'Подгруппа 2.2',
                description: 'Вторая подгруппа',
                manager: {
                  name: 'Игорь Игоревич Игорев',
                  title: 'Руководитель подгруппы',
                  photo: null
                },
                children: [],
                showChildren: false,
                showParents: false,
                isStaff: false,
                parent: null
              },
              {
                id: '5_3',
                name: 'Подгруппа 2.3',
                description: 'Третья подгруппа',
                manager: {
                  name: 'Константин Константинович Константинов',
                  title: 'Руководитель подгруппы',
                  photo: null
                },
                children: [],
                showChildren: false,
                showParents: false,
                isStaff: false,
                parent: null
              }
            ],
            showChildren: true,
            showParents: false,
            isStaff: false,
            parent: null
          },
          {
            id: '6',
            name: 'Охрана труда - Группа 3',
            description: 'Группа охраны труда 3',
            manager: {
              name: 'Роман Романович Романов',
              title: 'Руководитель группы',
              photo: null
            },
            children: [
              {
                id: '6_1',
                name: 'Подгруппа 3.1',
                description: 'Первая подгруппа',
                manager: {
                  name: 'Леонид Леонидович Леонидов',
                  title: 'Руководитель подгруппы',
                  photo: null
                },
                children: [],
                showChildren: false,
                showParents: false,
                isStaff: false,
                parent: null
              },
              {
                id: '6_2',
                name: 'Подгруппа 3.2',
                description: 'Вторая подгруппа',
                manager: {
                  name: 'Михаил Михайлович Михайлов',
                  title: 'Руководитель подгруппы',
                  photo: null
                },
                children: [],
                showChildren: false,
                showParents: false,
                isStaff: false,
                parent: null
              }
            ],
            showChildren: true,
            showParents: false,
            isStaff: false,
            parent: null
          },
          {
            id: '7',
            name: 'Отдел разработки',
            description: 'Отдел разработки проектов',
            manager: {
              name: 'Николай Николаевич Николаев',
              title: 'Начальник отдела',
              photo: null
            },
            children: [
              {
                id: '7_1',
                name: 'Команда разработки 1',
                description: 'Первая команда разработки',
                manager: {
                  name: 'Олег Олегович Олегов',
                  title: 'Руководитель команды',
                  photo: null
                },
                children: [],
                showChildren: false,
                showParents: false,
                isStaff: false,
                parent: null
              },
              {
                id: '7_2',
                name: 'Команда разработки 2',
                description: 'Вторая команда разработки',
                manager: {
                  name: 'Павел Павлович Павлов',
                  title: 'Руководитель команды',
                  photo: null
                },
                children: [],
                showChildren: false,
                showParents: false,
                isStaff: false,
                parent: null
              },
              {
                id: '7_3',
                name: 'Команда разработки 3',
                description: 'Третья команда разработки',
                manager: {
                  name: 'Руслан Русланович Русланов',
                  title: 'Руководитель команды',
                  photo: null
                },
                children: [],
                showChildren: false,
                showParents: false,
                isStaff: false,
                parent: null
              }
            ],
            showChildren: true,
            showParents: false,
            isStaff: false,
            parent: null
          }
        ],
        showChildren: true,
        showParents: false,
        isStaff: false,
        parent: null
      },
      {
        id: '8',
        name: 'Зам. по кадрам',
        description: 'Заместитель по кадрам',
        manager: {
          name: 'Алексей Романович Лебедев',
          title: 'Заместитель',
          photo: null
        },
        children: [
          {
            id: '8_1',
            name: 'Отдел кадров',
            description: 'Отдел кадрового делопроизводства',
            manager: {
              name: 'Сергей Сергеевич Сергеев',
              title: 'Начальник отдела',
              photo: null
            },
            children: [
              {
                id: '8_1_1',
                name: 'Сектор приема',
                description: 'Сектор приема на работу',
                manager: {
                  name: 'Тимофей Тимофеевич Тимофеев',
                  title: 'Руководитель сектора',
                  photo: null
                },
                children: [],
                showChildren: false,
                showParents: false,
                isStaff: false,
                parent: null
              },
              {
                id: '8_1_2',
                name: 'Сектор увольнения',
                description: 'Сектор увольнения',
                manager: {
                  name: 'Ульяна Ульяновна Ульянова',
                  title: 'Руководитель сектора',
                  photo: null
                },
                children: [],
                showChildren: false,
                showParents: false,
                isStaff: false,
                parent: null
              }
            ],
            showChildren: true,
            showParents: false,
            isStaff: false,
            parent: null
          },
          {
            id: '8_2',
            name: 'Отдел обучения',
            description: 'Отдел обучения персонала',
            manager: {
              name: 'Филипп Филиппович Филиппов',
              title: 'Начальник отдела',
              photo: null
            },
            children: [],
            showChildren: false,
            showParents: false,
            isStaff: false,
            parent: null
          }
        ],
        showChildren: true,
        showParents: false,
        isStaff: false,
        parent: null
      },
      {
        id: '9',
        name: 'Зам. по финансам',
        description: 'Заместитель по финансовым вопросам',
        manager: {
          name: 'Харитон Харитонович Харитонов',
          title: 'Заместитель',
          photo: null
        },
        children: [
          {
            id: '9_1',
            name: 'Бухгалтерия',
            description: 'Бухгалтерский отдел',
            manager: {
              name: 'Цезарь Цезаревич Цезарев',
              title: 'Главный бухгалтер',
              photo: null
            },
            children: [
              {
                id: '9_1_1',
                name: 'Сектор расчетов',
                description: 'Сектор расчетов с персоналом',
                manager: {
                  name: 'Шамиль Шамилевич Шамилев',
                  title: 'Руководитель сектора',
                  photo: null
                },
                children: [],
                showChildren: false,
                showParents: false,
                isStaff: false,
                parent: null
              },
              {
                id: '9_1_2',
                name: 'Сектор отчетности',
                description: 'Сектор финансовой отчетности',
                manager: {
                  name: 'Эдуард Эдуардович Эдуардов',
                  title: 'Руководитель сектора',
                  photo: null
                },
                children: [],
                showChildren: false,
                showParents: false,
                isStaff: false,
                parent: null
              }
            ],
            showChildren: true,
            showParents: false,
            isStaff: false,
            parent: null
          },
          {
            id: '9_2',
            name: 'Планово-экономический отдел',
            description: 'Планово-экономический отдел',
            manager: {
              name: 'Юрий Юрьевич Юрьев',
              title: 'Начальник отдела',
              photo: null
            },
            children: [],
            showChildren: false,
            showParents: false,
            isStaff: false,
            parent: null
          }
        ],
        showChildren: true,
        showParents: false,
        isStaff: false,
        parent: null
      },
      {
        id: '10',
        name: 'Зам. по безопасности',
        description: 'Заместитель по безопасности',
        manager: {
          name: 'Ярослав Ярославович Ярославов',
          title: 'Заместитель',
          photo: null
        },
        children: [
          {
            id: '10_1',
            name: 'Служба безопасности',
            description: 'Служба безопасности предприятия',
            manager: {
              name: 'Антон Антонович Антонов',
              title: 'Начальник службы',
              photo: null
            },
            children: [],
            showChildren: false,
            showParents: false,
            isStaff: false,
            parent: null
          },
          {
            id: '10_2',
            name: 'Охрана',
            description: 'Отдел охраны',
            manager: {
              name: 'Богдан Богданович Богданов',
              title: 'Начальник отдела',
              photo: null
            },
            children: [],
            showChildren: false,
            showParents: false,
            isStaff: false,
            parent: null
          }
        ],
        showChildren: true,
        showParents: false,
        isStaff: false,
        parent: null
      }
    ],
    showChildren: true,
    showParents: false,
    isStaff: false,
    parent: null
  }
})

// Устанавливаем родительские ссылки
const setupParentLinks = (dept, parent = null) => {
  dept.parent = parent
  if (dept.children && dept.children.length > 0) {
    dept.children.forEach(child => {
      setupParentLinks(child, dept)
    })
  }
}

// Устанавливаем родительские ссылки для всей структуры
setupParentLinks(INPUT_DATA.value.chart)

export const useOrgChartStore = defineStore('orgChart', () => {
  // State
  const config = ref(CONFIG)
  const updatedOn = ref(UPDATED_ON)
  const uiNames = ref(UINAMES)
  const chart = ref(INPUT_DATA.value.chart)
  const people = ref([])
  const assignments = ref([])
  const lines = ref([])
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
    if (!INPUT_DATA.value.api_version) {
      data = processData()
      createTree(data)
      console.log('Loading OLD input data format')
    } else if (INPUT_DATA.value.api_version === '1.0') {
      data = processData10(INPUT_DATA.value.chart, [])
      peopleData = processPeople10(INPUT_DATA.value.people)
      createTree1(data)
      console.log('Loading 1.0 input data format')
    } else if (INPUT_DATA.value.api_version === '2.0') {
      data = processData10(INPUT_DATA.value.chart, [])
      peopleData = processPeople10(INPUT_DATA.value.people)
      createTree1(data)
      console.log('Loading 2.0 input data format')
    } else {
      alert('wrong version input file')
    }

    processAssignments({
      departments: data.orgArray,
      people: peopleData,
      assignments: INPUT_DATA.value.assignments
    })
    setPeople(peopleData)
    setAssignments(INPUT_DATA.value.assignments)

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
    console.log('=== initZoom called ===')

    const area = document.querySelector('#chart')
    if (!area) {
      console.error('Chart element not found for panzoom')
      return
    }

    console.log('Chart element found:', area)

    // Удаляем предыдущий экземпляр
    if (zoomInstance.value) {
      console.log('Disposing previous zoom instance')
      zoomInstance.value.dispose()
      zoomInstance.value = null
    }

    try {
      console.log('Creating new panzoom instance...')

      const instance = panzoom(area, {
        smoothScroll: false,
        maxZoom: 2,
        minZoom: 0.2,
        beforeWheel: function (e) {
          console.log('=== Wheel event captured by panzoom ===', e)
          return false
        },
        beforeMouseDown: function (e) {
          console.log('=== Mouse down event captured by panzoom ===', e)
          return false
        },
        beforeTouchStart: function (e) {
          console.log('=== Touch start event captured by panzoom ===', e)
          return false
        },
        onZoom: function (e) {
          console.log('=== Zoom event ===', e)
          // Обновляем линии при зуме
          setTimeout(() => {
            refreshLines()
          }, 100)
        },
        onPan: function (e) {
          console.log('=== Pan event ===', e)
          // Обновляем линии при перемещении
          setTimeout(() => {
            refreshLines()
          }, 100)
        }
      })

      console.log('Panzoom instance created successfully:', instance)

      setTimeout(() => {
        let pos
        if (dept) {
          pos = getPosOfElement(dept)
          if (pos) {
            instance.moveTo(pos.element.x, pos.element.y)
            instance.zoomTo(1)
            console.log('Moved to department position:', pos)
          }
        } else {
          instance.moveTo(0, 0)
          instance.zoomTo(1)
          console.log('Moved to default position')
        }
      }, 100)

      zoomInstance.value = instance
      console.log('Zoom instance stored in store:', zoomInstance.value)
    } catch (error) {
      console.error('Panzoom initialization failed:', error)
      console.error('Error stack:', error.stack)
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

  // Методы для управления департаментами
  const setActiveDepartment = (department) => {
    activeDepartment.value = department
    console.log('Active department set to:', department)
  }

  const setActiveDepartmentById = (id) => {
    const dept = findDept(chart.value, id)
    if (dept) {
      setActiveDepartment(dept)
    }
  }

  const findDept = (dept, id) => {
    if (dept.id === id) return dept
    for (const child of dept.children || []) {
      const found = findDept(child, id)
      if (found) return found
    }
    return null
  }

  const showChildren = (department) => {
    department.showChildren = true
    refreshLines()
  }

  const hideChildren = (department) => {
    department.showChildren = false
    refreshLines()
  }

  const setHideParents = (value) => {
    onlyShowParents.value = value
  }

  const setOnlyShowParents = (value) => {
    onlyShowParents.value = value
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
    console.log('addLine called')
    lines.value = updateLines(chart.value, [])
  }

  const refreshLines = () => {
    console.log('refreshLines called')
    if (chart.value) {
      lines.value = updateLines(chart.value, [])
    }
  }

  const forceUpdateLines = () => {
    console.log('forceUpdateLines called')

    // Очищаем текущие линии
    lines.value = []

    // Ждем стабилизации DOM и пересчитываем линии
    setTimeout(() => {
      if (chart.value) {
        console.log('Recalculating lines after visibility change...')
        lines.value = updateLines(chart.value, [])
        console.log('Lines updated:', lines.value.length)
      }
    }, 200) // Увеличиваем задержку для полной стабилизации DOM
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

  const recalculateLinesOnResize = () => {
    console.log('Recalculating lines on resize...')
    // Небольшая задержка для стабилизации DOM
    setTimeout(() => {
      updateLines(chart.value, [])
    }, 100)
  }

  const getPosOfElement = (dept) => {
    console.log('getPosOfElement called for dept:', dept.id)

    const parentElement = document.getElementById('ID_' + dept.parent.id)
    const childElement = document.getElementById('ID_' + dept.id)

    if (!parentElement || !childElement) {
      console.log('Elements not found for dept:', dept.id)
      return { parent: null }
    }

    const pos = {
      parent: dept.parent
        ? document
          .getElementById('ID_' + dept.parent.id)
          .getBoundingClientRect()
        : null,
      element: document
        .getElementById('ID_' + dept.id)
        .getBoundingClientRect()
    }

    const chartpos = document
      .getElementById('chart')
      .getBoundingClientRect()

    if (pos.parent) {
      pos.parent.x = pos.parent.left - chartpos.left
      pos.parent.y = pos.parent.top - chartpos.top
    }
    pos.element.x = pos.element.left - chartpos.left
    pos.element.y = pos.element.top - chartpos.top

    console.log('Calculated positions (original):', pos)
    return pos
  }

  // Функции для работы с линиями (из оригинального проекта)
  const updateLines = (dept, lines) => {
    console.log('updateLines called for dept:', dept.id)

    const svg = document.getElementById('svg')
    const xparent = document.getElementById('chart')

    if (svg && xparent) {
      svg.style.width = xparent.offsetWidth + 'px'
      svg.style.height = xparent.offsetHeight + 'px'
    }

    let line
    if (dept.showChildren) {
      dept.children.forEach(child => {
        line = getLine(child)
        if (line) {
          lines.push(getLine(child))
          updateLines(child, lines)
        }
      })
    }
    return lines
  }

  const getLine = (dept) => {
    console.log('getLine called for dept:', dept)
    const pos = getPosOfElement(dept)
    if (!pos.parent) {
      console.log('No parent found for dept:', dept.id)
      return null
    }

    let d
    const x = document.getElementById('chart')
    const scale = 1 / (x.getBoundingClientRect().width / x.offsetWidth)

    if (dept.isStaff) {
      d =
        'M' +
        Math.round(pos.parent.x + pos.parent.width / 2) * scale +
        ' ' +
        Math.round(pos.parent.y + pos.parent.height) * scale +
        ' v' +
        Math.round(
          pos.element.bottom -
          pos.parent.bottom -
          pos.element.height / 2
        ) *
        scale +
        ' H' +
        Math.round(pos.element.x + pos.parent.width) * scale
    } else {
      d =
        'M' +
        Math.round(pos.parent.x + pos.parent.width / 2) * scale +
        ' ' +
        Math.round(pos.parent.y + pos.parent.height) * scale +
        ' V' +
        Math.round(pos.element.y * scale - 10) +
        ' H' +
        Math.round(pos.element.x + pos.parent.width / 2) * scale +
        ' V' +
        Math.round(pos.element.y) * scale
    }

    console.log('Generated line path (original):', d)
    return { d: d }
  }

  // Инициализация store
  const initializeStore = () => {
    console.log('Initializing store with new data structure')

    // Устанавливаем родительские ссылки
    setupParentLinks(INPUT_DATA.value.chart)

    // Устанавливаем chart
    chart.value = INPUT_DATA.value.chart

    // Инициализируем lines
    updateLines(chart.value, [])

    console.log('Store initialized with chart:', chart.value)
  }

  return {
    // State
    config,
    updatedOn,
    uiNames,
    chart,
    people,
    assignments,
    lines,
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
    forceUpdateLines,
    setHideParents,
    setOnlyShowParents,
    showChildren,
    hideChildren,
    removeAssignment,
    updateRole,
    updateActiveDepartmentName,
    updateActiveDepartmentDescription,
    updateActiveDepartmentIsStaff,
    setShowDepartment,
    refreshLines,
    recalculateLinesOnResize,
    getPosOfElement,
    updateLines,
    getLine,
    initializeStore
  }
}) 