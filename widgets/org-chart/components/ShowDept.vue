<template>
  <div class="container">
    <table>
      <tbody>
        <template v-if="!staffChildren.length">
          <tr>
            <td>
              <dept-box
                :department-data="parent"
                :level="level"
                type="normal"
              />
              <template
                v-if="
                  columnView &&
                  (!parent.parent || parent.parent.showChildren) &&
                  !parent.showChildren
                "
              >
                <table v-if="!(parent.isStaff && columnView_noStaff)">
                  <tbody>
                    <tr
                      v-for="child in parent.children"
                      :key="child.id"
                    >
                      <td>
                        <dept-box
                          :department-data="child"
                          :level="level + 1"
                          type="column"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td></td>
            <td class="dept">
              <dept-box
                :department-data="parent"
                :level="level"
                type="normal"
              />
              <template
                v-if="
                  columnView &&
                  (!parent.parent || parent.parent.showChildren) &&
                  !parent.showChildren
                "
              >
                <table v-if="!(parent.isStaff && columnView_noStaff)">
                  <tbody>
                    <tr
                      v-for="child in parent.children"
                      :key="child.id"
                    >
                      <td>
                        <dept-box
                          :department-data="child"
                          :level="level + 1"
                          type="column"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </td>
            <td></td>
          </tr>
          <tr v-if="parent.showChildren">
            <td>
              <div class="staff-left">
                <table>
                  <tbody>
                    <tr
                      v-for="staff in staffChildren"
                      :key="staff.left.id"
                    >
                      <td>
                        <show-dept
                          :parent="staff.left"
                          :level="level + 1"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
            <td class="dept"></td>
            <td>
              <div class="staff-right">
                <table>
                  <tbody>
                    <tr
                      v-for="staff in staffChildren"
                      :key="staff.left.id"
                    >
                      <td v-if="staff.right">
                        <show-dept
                          :parent="staff.right"
                          :level="level + 1"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <table class="tabchildren">
      <tbody>
        <tr v-if="parent.showChildren">
          <td
            v-for="child in hierarchyChildren"
            :key="child.id"
            class="tabchild"
          >
            <show-dept :parent="child" :level="level + 1" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'
import DeptBox from './DeptBox.vue'

// Props
const props = defineProps({
  parent: {
    type: Object,
    required: true,
    default: null,
  },
  level: {
    type: Number,
    required: true,
    default: 0,
  },
})

// Store
const store = useOrgChartStore()

// Local state
const showChildren = ref(false)

// Computed from store
const columnView = computed(() => store.columnView)
const columnView_noStaff = computed(() => store.columnView_noStaff)

// Computed
const hierarchyChildren = computed(() => {
  if (props.parent.onlyShowThisChild) {
    return [props.parent.onlyShowThisChild]
  }
  return props.parent.children.filter((e) => !e.isStaff)
})

const staffChildren = computed(() => {
  if (props.parent.onlyShowThisChild) {
    return []
  }
  const staff = props.parent.children.filter((e) => e.isStaff)
  const result = []
  staff.forEach((e, i) => {
    if (i % 2 === 0) {
      result.push({ left: e, right: null })
    } else {
      result[result.length - 1].right = e
    }
  })
  return result
})

const staffChildrenR = computed(() => {
  return props.parent.children.filter((e, i) => {
    return e.isStaff && i % 2 === 0
  })
})
</script>

<style scoped>
table {
  table-layout: fixed;
  border: 0px solid green;
  margin: auto;
  pointer-events: none;
}

td {
  border: 0px dashed rgba(100, 100, 100, 0.3);
  width: 30%;
  pointer-events: none;
}

td.dept {
  width: 60px;
}

div.staff-left {
  float: right;
  pointer-events: none;
}

div.staff-right {
  float: left;
  pointer-events: none;
}

.container {
  display: inline-block;
  position: relative;
  margin: 20px 5px 10px 5px;
  text-align: center;
  pointer-events: none;
}

table.staff {
  margin: auto;
  pointer-events: none;
}

.parent {
  display: inline-block;
  border: 1px solid grey;
}

.child {
  display: inline-block;
}

.dept {
  border: 0px solid red;
}

table {
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0px;
  padding: 0px;
  border-collapse: collapse;
  box-sizing: border-box;
  border: 0px solid orange;
  pointer-events: none;
}

tr {
  box-sizing: border-box;
  pointer-events: none;
}

td {
  text-align: center;
  vertical-align: top;
  box-sizing: border-box;
  pointer-events: none;
}

.col {
  border: 1px solid red;
}

.tabchildren {
  pointer-events: none;
}

.tabchild {
  width: auto;
  pointer-events: none;
}
</style>
