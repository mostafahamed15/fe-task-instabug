<template>
  <div>
    <form @submit.prevent="search()" class="c-filters_form">
      <div class="c-filters_group">
        <label for="search">Search:</label>
        <input
          type="text"
          v-model="filter"
          name="search"
          placeholder="name"
          required
        />
      </div>

      <button class="c-filter-btn" type="submit">Search</button>
    </form>
    <button class="c-filter-btn" @click="clear" type="submit">Clear</button>
  </div>
</template>

<script>
export default {
  name: 'FiltersComponent',
  data() {
    return {
      filter: '',
    };
  },
  methods: {
    search() {
      this.$emit('search', this.filter);
    },
    clear() {
      this.$emit('clear');
      this.filter = '';
    },
  },
  mounted() {
    let urlParams = new URLSearchParams(window.location.search),
      employee = urlParams.get('employee');
    if (employee) {
      this.filter = employee;
      this.search();
    }
  },
};
</script>
