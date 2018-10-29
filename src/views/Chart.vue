<template>
    <ChartBox/>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ChartBox from '@/components/ChartBox.vue';

  @Component({
    components: {
      ChartBox,
    },
  })
  export default class Chart extends Vue {
  }
</script>
