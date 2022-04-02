<template>
  <div class="c-page-not-found">
    <h1>Not Found</h1>
    <p>Ooops! The {{ path[1] }} Not Found</p>
    <div>
      Back to <a href="/">Home</a> or
      <a href="/team-performance">Team Performance</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  data() {
    return {
      path: window.location.pathname.split('/'),
    };
  },
};
</script>
