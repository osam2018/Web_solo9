<template>
    <el-aside width="200px" style="background-color: #212121">
        <el-menu
                :router="true"
                :default-active="$route.path"
                background-color="#212121"
                text-color="#fff"
                active-text-color="#03dac5">
            <el-menu-item index="/player">
                <i class="el-icon-service"></i>
                <span>플레이어</span>
            </el-menu-item>
            <el-menu-item index="/playlist">
                <i class="el-icon-tickets"></i>
                <span>플레이리스트</span>
            </el-menu-item>
            <el-menu-item index="/upload">
                <i class="el-icon-upload"></i>
                <span>업로드</span>
            </el-menu-item>
            <el-menu-item index="/search">
                <i class="el-icon-search"></i>
                <span>검색</span>
            </el-menu-item>
            <el-menu-item index="/chart">
                <i class="el-icon-d-caret"></i>
                <span>실시간 차트</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class SideBar extends Vue {
  }
</script>

<style>
    .el-menu {
        border-right: none;
    }
</style>
