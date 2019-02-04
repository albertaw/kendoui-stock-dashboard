import Vue from 'vue'
import App from './App.vue'
import '@progress/kendo-ui'
import '@progress/kendo-theme-bootstrap/dist/all.css'
import { Splitter, LayoutInstaller } from '@progress/kendo-layout-vue-wrapper'
import { DropDownList, DropdownsInstaller } from '@progress/kendo-dropdowns-vue-wrapper'
import { ButtonGroup,
        ButtonGroupButton,
        ButtonsInstaller } from '@progress/kendo-buttons-vue-wrapper'
import { Grid, GridInstaller } from '@progress/kendo-grid-vue-wrapper'
import { Chart, ChartInstaller } from '@progress/kendo-charts-vue-wrapper'
import { DataSource, DataSourceInstaller } from '@progress/kendo-datasource-vue-wrapper'

Vue.use(DataSourceInstaller)
Vue.use(LayoutInstaller)
Vue.use(DropdownsInstaller)
Vue.use(ButtonsInstaller)
Vue.use(GridInstaller)
Vue.use(ChartInstaller)

new Vue({
  el: '#app',
  components: {
  	Splitter,
  	DropDownList,
  	ButtonGroup,
    ButtonGroupButton,
    Grid,
  	Chart,
    DataSource
  },
  render: h => h(App)
})
