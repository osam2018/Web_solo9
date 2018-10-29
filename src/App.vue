<template>
    <component :is="layout">
        <router-view/>
    </component>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    get layout() {
      return `${(this.$route.meta.layout || 'default')}-layout`;
    }
  }
</script>

<style>
    html {
        height: 100%;
    }

    body {
        margin: 0;
        height: 100%;
    }
</style>
