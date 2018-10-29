<template>
    <el-container direction="horizontal">
        <PlayerBox/>
    </el-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import PlayerBox from '@/components/PlayerBox.vue';

  @Component({
    components: {
      PlayerBox,
    },
  })
  export default class Player extends Vue {
  }
</script>
