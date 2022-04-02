// import dependency to handle HTTP request to our back end
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

// load Vuex
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    performances: [],
    date: {},
  },
  // to handle state
  getters: {
    allPerformances: (state) => state.performances,
  },
  actions: {
    getPerformances({ commit }) {
      axios
        .get('https://fe-task.getsandbox.com/performance')
        .then((response) => {
          commit('SET_PERFORMANCES', response.data);
        });
    },
    getPerformancesFilter({ commit, state }) {
      axios
        .get('https://fe-task.getsandbox.com/performance')
        .then((response) => {
          let data = [];
          let startDate = moment(state.date.dateFrom).format('DD MMM YYYY');
          let endDate = moment(state.date.dateTo).format('DD MMM YYYY');
          response.data.map(
            (item) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              data.push({
                date_ms: moment(item.date_ms).format('DD MMM YYYY'),
                performance: item.performance,
              })
            // eslint-disable-next-line function-paren-newline
          );
          let dataFiltered = data.filter(
            (item) => item.date_ms >= startDate && item.date_ms <= endDate
          );
          commit('SET_PERFORMANCES', dataFiltered);
        });
    },
    getDate({ commit, dispatch }, date) {
      commit('SET_DATE', date);
      dispatch('getPerformancesFilter');
    },
  },
  mutations: {
    SET_PERFORMANCES(state, performances) {
      state.performances = performances;
    },
    SET_DATE(state, date) {
      state.date = date;
    },
  },
});
export default store;
