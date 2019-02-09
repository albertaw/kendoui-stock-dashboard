<template>
  <div id="app">
    <kendo-dropdownlist 
      ref="dropdown"
      :data-source="stockDataSource"
      :data-text-field="'text'"
      :data-value-field="'value'"
      @select="onStockSelect">
    </kendo-dropdownlist>
    <kendo-buttongroup 
      ref="buttonGroup"
      @select="onPeriodSelect">
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
        <kendo-chart
          ref="chart"
          :title="title"
          :tooltip="tooltip"
          :series="series"
          :category-axis="categoryAxis"
          :value-axis="valueAxis">
        </kendo-chart>
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
      ],
      title: {
        text: 'Closing Prices'
      },
      tooltip: {
        visible: true,
        template: '$#: value #'
      },
      series: [{
        type: 'line',
        field: 'close',
        markers: {
          visible: false
        }
      }],
      categoryAxis: {
        field: 'date',
        visible: false
      },
      valueAxis: {
        labels: {
          format: '${0}'
        }
      },
      stock: 'amzn',
      period: '1m',
    }
  },
  computed: {
   url() {
      return 'https://api.iextrading.com/1.0/stock/' + this.stock + '/chart/' + this.period;
    }
  },
  mounted() {
    var dropdown = this.$refs.dropdown.kendoWidget();
    var buttonGroup = this.$refs.buttonGroup.kendoWidget();
    dropdown.select(0);
    buttonGroup.select(0);
  },
  methods: {
    updateGrid(url) {
      var grid = this.$refs.grid.kendoWidget();
      grid.setDataSource(new kendo.data.DataSource({
        transport: {
            read: {
              url: url,
              dataType: 'json'
            }
          }
      }));
    },
    updateChart(url) {
      var chart = this.$refs.chart.kendoWidget();
      chart.setDataSource(new kendo.data.DataSource({
        transport: {
            read: {
              url: url,
              dataType: 'json'
            }
          }
      }));
    },
    onStockSelect(e) {
      var value = e.dataItem.value;
      if (value === 0) {
        this.stock = 'amzn';
      } else if (value == 1) {
        this.stock = 'aapl';
      } else if (value == 2) {
        this.stock = 'googl';
      } else if (value == 3){
        this.stock = 'msft';
      }

      this.updateGrid(this.url);
      this.updateChart(this.url);
    },
    onPeriodSelect(e) {
      var index = e.indices[0];

      if (index == 0) {
        this.period = '1m';
      } else if (index == 1) {
        this.period = '3m';
      } else if (index == 2) {
        this.period = '6m';
      }

      this.updateGrid(this.url);
      this.updateChart(this.url);
    }
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












