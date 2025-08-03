<template>
  <div id="config_container">
    <div id="config">
      <h3>Configure</h3>
      <input type="checkbox" v-model="showHelp" />
      <span> Show explanations of the options in this screen </span>

      <div class="sectiontitle">Title bar settings</div>
      <table class="tab">
        <tbody>
          <tr>
            <td class="n">Title</td>
            <td class="i">
              <input v-model="pageTitle" />
            </td>
          </tr>
          <tr v-if="showHelp">
            <td class="help" colspan="2">Sets the header title</td>
          </tr>
          <tr>
            <td class="n">Title bar color</td>
            <td class="i">
              <input v-model="pageTitleColor" />
            </td>
          </tr>
          <tr v-if="showHelp">
            <td class="help" colspan="2">
              Sets the header color (#FF0000 is red for example)
            </td>
          </tr>
          <tr>
            <td class="n">Information text</td>
            <td class="i">
              <textarea v-model="informationText"></textarea>
            </td>
          </tr>
          <tr v-if="showHelp">
            <td class="help" colspan="2">
              Sets text to display when clicked on the (i) button (you
              can use HTML). Leave empty if not needed
            </td>
          </tr>
          <tr>
            <td class="n">Enable screencapture</td>
            <td class="c">
              <input type="checkbox" v-model="enableScreenCapture" />
            </td>
          </tr>
          <tr v-if="showHelp">
            <td class="help" colspan="2">
              This shows the icon to make an image of the graph to
              save. This does not work when you are on a local folder,
              so disable this option then
            </td>
          </tr>
          <tr>
            <td class="n">Enable user settings</td>
            <td class="c">
              <input type="checkbox" v-model="enableUserSettings" />
            </td>
          </tr>
          <tr v-if="showHelp">
            <td class="help" colspan="2">
              This shows the icon for the user to change the default
              display settings (see start up settings)
            </td>
          </tr>
          <tr>
            <td class="n">Show link to User Manual</td>
            <td class="c">
              <input type="checkbox" v-model="showUserManual" />
            </td>
          </tr>
          <tr v-if="showHelp">
            <td class="help" colspan="2">
              This enables the link to the user manual on the external
              website, and also a link to the GitHub project. Which
              you will see under the (i) icon at the top-right. If you
              do not want this, disable this option.
            </td>
          </tr>
          <tr>
            <td class="n">Edit command</td>
            <td class="i">
              <input v-model="editCommand" />
            </td>
          </tr>
          <tr v-if="showHelp">
            <td class="help" colspan="2">
              The command to type in the search box to switch to edit
              mode
            </td>
          </tr>
        </tbody>
      </table>

      <div class="sectiontitle">Links settings</div>
      <table class="tab">
        <tbody>
          <tr>
            <td class="n">Photo URL prefix</td>
            <td class="i">
              <input v-model="photoUrlP" />
            </td>
          </tr>
          <tr>
            <td class="n">Photo URL suffix</td>
            <td class="i">
              <input v-model="photoUrlS" />
            </td>
          </tr>
          <tr v-if="showHelp">
            <td class="help" colspan="2">
              The position where to get the photo's. For these
              locations it is fetched from "prefix" + photo +
              "suffix". So if you have photo P0001, it will be fetched
              from "photos/P0001.png". If you have an api or other
              locations which delivers photo's based on the photo
              field you can change that here.
            </td>
          </tr>
          <tr>
            <td class="n">Link URL prefix</td>
            <td class="i">
              <input v-model="linkUrlP" />
            </td>
          </tr>
          <tr>
            <td class="n">Link URL suffix</td>
            <td class="i">
              <input v-model="linkUrlS" />
            </td>
          </tr>
          <tr v-if="showHelp">
            <td class="help" colspan="2">
              It will open a new tab to navigate to that page when
              clicked in the sidescreen on a person. If you have an
              api which shows a user profile page you can enter the
              location here. Keep both empty if you want to see the
              profile information from this application (default)
            </td>
          </tr>
        </tbody>
      </table>

      <div class="sectiontitle">Department boxes</div>
      <table class="tab">
        <tbody>
          <tr>
            <td class="n">Level colors</td>
            <td class="i">
              <input v-model="levelColors" />
            </td>
          </tr>
          <tr v-if="showHelp">
            <td class="help" colspan="2">
              The colors of each level in the orgchart (specify comma
              separated)
            </td>
          </tr>
        </tbody>
      </table>
      <table class="tab">
        <tbody>
          <tr>
            <td class="n">Box width</td>
            <td class="i">
              <input v-model="boxWidth" />
            </td>
          </tr>
          <tr>
            <td class="n">Box height</td>
            <td class="i">
              <input v-model="boxHeight" />
            </td>
          </tr>
          <tr v-if="showHelp">
            <td class="help" colspan="2">
              The height and width of the department boxes in the
              graph. Adjust if department names or people names are
              too long/short to properly fit
            </td>
          </tr>
        </tbody>
      </table>

      <div class="sectiontitle">Person fields</div>
      <div v-if="showHelp" class="help">
        Add, remove, rename or move the fields of a person (Name,
        Employee ID and Function cannot be changed)
      </div>

      <!-- Остальная часть компонента будет добавлена позже -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useOrgChartStore } from '../stores/orgChart'

// Store
const store = useOrgChartStore()

// Local state
const showHelp = ref(false)
const pageTitle = ref('Organization Chart')
const pageTitleColor = ref('#05668d')
const informationText = ref('')
const enableScreenCapture = ref(true)
const enableUserSettings = ref(true)
const showUserManual = ref(true)
const editCommand = ref('edit')
const photoUrlP = ref('')
const photoUrlS = ref('')
const linkUrlP = ref('')
const linkUrlS = ref('')
const levelColors = ref('#FFFFFF,#F0F0F0,#E0E0E0')
const boxWidth = ref(200)
const boxHeight = ref(60)

// Computed from store
const config = computed(() => store.config)

// Watchers
watch(pageTitle, (value) => {
  store.setConfigUpdate({ prop: 'pageTitle', val: value })
})

watch(pageTitleColor, (value) => {
  store.setConfigUpdate({ prop: 'pageTitleColor', val: value })
})

watch(informationText, (value) => {
  store.setConfigUpdate({ prop: 'informationText', val: value })
})

watch(enableScreenCapture, (value) => {
  store.setConfigUpdate({ prop: 'enableScreenCapture', val: value })
})

watch(enableUserSettings, (value) => {
  store.setConfigUpdate({ prop: 'enableUserSettings', val: value })
})

watch(showUserManual, (value) => {
  store.setConfigUpdate({ prop: 'showUserManual', val: value })
})

watch(editCommand, (value) => {
  store.setConfigUpdate({ prop: 'editCommand', val: value })
})

watch(photoUrlP, (value) => {
  store.setConfigUpdate({
    prop: 'photoUrl',
    subProp: 'prefix',
    val: value,
  })
})

watch(photoUrlS, (value) => {
  store.setConfigUpdate({
    prop: 'photoUrl',
    subProp: 'suffix',
    val: value,
  })
})

watch(linkUrlP, (value) => {
  store.setConfigUpdate({
    prop: 'linkUrl',
    subProp: 'prefix',
    val: value,
  })
})

watch(linkUrlS, (value) => {
  store.setConfigUpdate({
    prop: 'linkUrl',
    subProp: 'suffix',
    val: value,
  })
})

watch(levelColors, (value) => {
  store.setConfigUpdate({
    prop: 'levelColors',
    val: value.split(','),
  })
})

watch(boxWidth, (value) => {
  store.setConfigUpdate({ prop: 'boxWidth', val: parseInt(value) })
})

watch(boxHeight, (value) => {
  store.setConfigUpdate({ prop: 'boxHeight', val: parseInt(value) })
})
</script>

<style scoped>
#config_container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

#config {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.sectiontitle {
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}

.tab {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}

.tab td {
  padding: 5px;
  border: 1px solid #ddd;
}

.tab td.n {
  width: 200px;
  font-weight: bold;
}

.tab td.i input,
.tab td.i textarea {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.tab td.c input {
  margin: 0;
}

.tab td.help {
  background-color: #f9f9f9;
  font-style: italic;
  color: #666;
  font-size: 12px;
}

.help {
  background-color: #f9f9f9;
  padding: 10px;
  margin: 10px 0;
  border-radius: 3px;
  font-style: italic;
  color: #666;
}
</style>
