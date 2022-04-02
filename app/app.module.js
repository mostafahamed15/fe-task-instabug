import Vue from 'vue';
import 'ngVue';
import 'ngVue/build/plugins.js';
import PerformancePageComponent from './pages/performance-page.vue';
import PageNotFound from './pages/page-not-found.vue';
import PerformanceChartComponent from './components/vue-components/performance-chart.vue';

angular
  .module('appModule', ['ui.router', 'ngVue', 'ngVue.plugins'])
  .config(($ngVueProvider) => {
    $ngVueProvider.activeQuirkMode();
  });

angular
  .module('appModule')
  .directive('vPerformancePage', (createVueComponent) => {
    return createVueComponent(
      Vue.component('performancePageComponent', PerformancePageComponent)
    );
  });

angular
  .module('appModule')
  .directive('vPerformanceChart', (createVueComponent) => {
    return createVueComponent(
      Vue.component('performanceChartComponent', PerformanceChartComponent)
    );
  });

angular.module('appModule').directive('vPageNotFound', (createVueComponent) => {
  return createVueComponent(Vue.component('PageNotFound', PageNotFound));
});
