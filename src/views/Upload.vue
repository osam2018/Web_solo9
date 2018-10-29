<template>
    <UploadBox/>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import UploadBox from '@/components/UploadBox.vue';

  @Component({
    components: {
      UploadBox,
    },
  })
  export default class Upload extends Vue {
  }
</script>
