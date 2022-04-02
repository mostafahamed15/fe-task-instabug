<template>
  <div class="c-chart__container">
    <v-chart ref="chart" :option="chartOptions" />
  </div>
</template>

<script>
import moment from 'moment';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LegendComponent,
  ToolboxComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import store from '../../store';

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LegendComponent,
  ToolboxComponent,
]);

export default {
  name: 'PerformanceChartComponent',
  components: {
    VChart,
  },

  data() {
    return {
      store: store,
      date: store.state.date,
    };
  },

  computed: {
    performances() {
      return store.getters.allPerformances;
    },
    initOptions() {
      return {
        width: 'auto',
        height: '500px',
      };
    },

    chartOptions() {
      return {
        title: {
          text: 'Team Performance Index',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: 10,
          backgroundColor: '#16253f',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            textAlign: 'center',
          },
        },
        toolbox: {
          show: true,
          axisPointer: {
            label: {
              color: '#000',
            },
          },
        },
        grid: {
          left: '30px',
          right: '12px',
          bottom: '2px',
          top: '6px',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          showGrid: false,
          data: this.xAxisData,
          axisLine: { show: false },
          axisTick: { show: true },
          axisLabel: { fontSize: 11 },
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true, alignWithLabel: true },
          splitLine: { show: true },
        },
        visualMap: {
          right: 10,
          top: 20,
          bottom: 20,
          pieces: [
            { min: 0, max: 50, label: '0-50', color: '#f4674c' },
            { min: 50, max: 80, label: '50-80', color: '#fbdb10' },
            { min: 80, label: '80-100', color: '#01984f' },
          ],
        },
        series: [
          {
            name: 'Team Performance Index:',
            data: this.yAxisData,
            type: 'line',
            symbol: 'circle',
            symbolSize: 2,
            cursor: 'default',
            lineStyle: {
              width: 2,
              type: 'solid',
            },
          },
        ],
      };
    },

    xAxisData() {
      return this.performances.map((item) => this.formatDate(item.date_ms));
    },

    yAxisData() {
      return this.performances.map((item) => +item.performance * 100);
    },
  },

  created() {
    store.dispatch('getPerformances');
  },

  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format('DD MMM YYYY');
    },
  },
};
</script>
