<template>
    <SearchBox/>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import SearchBox from '@/components/SearchBox.vue';

  @Component({
    components: {
      SearchBox,
    },
  })
  export default class Search extends Vue {
  }
</script>
