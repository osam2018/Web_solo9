<template>
    <el-container>
        <slot/>
    </el-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class Single extends Vue {
  }
</script>
