<template>
  <div>
    <form @submit.prevent="search()" class="c-filters_form">
      <div class="c-filters_group">
        <label for="from">From:</label>
        <input type="date" v-model="date.dateFrom" name="from" required />
      </div>

      <div class="c-filters_group">
        <label for="to">To:</label>
        <input type="date" v-model="date.dateTo" name="to" required />
      </div>
      <button class="c-filter-btn" type="submit">Search</button>
    </form>
    <template v-if="error">
      <p class="c-filter-error">{{ errorMessage }}</p>
    </template>
  </div>
</template>

<script>
import moment from 'moment';
import store from '../../store';
export default {
  name: 'PerformanceFilterComponent',
  data() {
    return {
      error: false,
      errorMessage: '',
      date: {
        dateFrom: '',
        dateTo: '',
      },
    };
  },
  computed: {
    fromDate() {
      return moment(this.date.dateFrom).format('DD MMM YYYY');
    },
    toDate() {
      return moment(this.date.dateTo).format('DD MMM YYYY');
    },
  },
  methods: {
    search() {
      if (
        moment(this.date.dateFrom).format('DD MMM YYYY') >
        moment(this.date.dateTo).format('DD MMM YYYY')
      ) {
        this.error = true;
        this.errorMessage = 'The End Date  must be after The Start Date';
      } else {
        this.error = false;
        store.dispatch('getDate', this.date);
      }
    },
  },
};
</script>
