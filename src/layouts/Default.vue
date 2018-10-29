<template>
    <el-container direction="vertical">
        <el-container direction="horizontal">
            <SideBar/>
            <slot/>
        </el-container>
    </el-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import SideBar from '@/layouts/SideBar.vue';

  @Component({
    components: {
      SideBar,
    },
  })
  export default class Default extends Vue {
  }
</script>

<style>
    .el-container {
        height: 100%;
    }

    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
</style>
