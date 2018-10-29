<template>
    <PlayListBox/>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import PlayListBox from '@/components/PlayListBox.vue';

  @Component({
    components: {
      PlayListBox,
    },
  })
  export default class PlayList extends Vue {
  }
</script>
