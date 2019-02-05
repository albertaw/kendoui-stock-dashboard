<template>
  <div id="app">
    <kendo-datasource ref="remoteDataSource"
      :transport-read-url="'https://api.iextrading.com/1.0/stock/aapl/chart/1m'"
      :transport-read-data-type="'json'">
    </kendo-datasource>
    <kendo-dropdownlist 
      ref="dropdown"
      :data-source="stockDataSource"
      :data-text-field="'text'"
      :data-value-field="'value'"
      :option-label="'Select Stock'">
    </kendo-dropdownlist>
    <kendo-buttongroup 
      ref="buttonGroup">
      <kendo-buttongroup-button>1M</kendo-buttongroup-button>
      <kendo-buttongroup-button>3M</kendo-buttongroup-button>
      <kendo-buttongroup-button>6M</kendo-buttongroup-button>
    </kendo-buttongroup>
    <kendo-splitter 
      :orientation="'horizontal'" 
      :panes="panes">
      <div>
        <kendo-grid 
          ref="grid"
          :selectable="true"
          :sortable="true"
          :height="'500px'">
          <kendo-grid-column :field="'date'"></kendo-grid-column>
          <kendo-grid-column :field="'close'"></kendo-grid-column>
          <kendo-grid-column :field="'volume'"></kendo-grid-column>
        </kendo-grid>
      </div>
      <div>
        Chart
      </div>
    </kendo-splitter>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      stockDataSource: [
        {text: 'Amazon', value: 0},
        {text: 'Apple', value: 1},
        {text: 'Google', value: 2},
        {text: 'Microsoft', value: 3} 
      ],
      panes: [
        { collapsible: true, scrollable: false, size: '34%' },
        { collapsible: true }
      ]
    }
  },
  mounted() {
    var grid = this.$refs.grid.kendoWidget();
    grid.setDataSource(new kendo.data.DataSource({
      transport: {
          read: {
            url: 'https://api.iextrading.com/1.0/stock/aapl/chart/1m',
            dataType: 'json'
          }
        }
    }));
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}
.k-splitter {
  height: 500px;
  margin-top: 16px;
}
</style>










