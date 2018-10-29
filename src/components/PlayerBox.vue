<template>
    <el-main>
        <el-row class="current-play-box">
            <el-col :span="24">
                <img :src="currentMusicObj.img" width="120px;" class="album-img">
                <div class="title-div">{{ currentMusicObj.title }}</div>
                <div class="artist-div">아티스트 : {{ currentMusicObj.artist }}</div>
                <div class="album-div">앨범 : {{ currentMusicObj.album }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column width="72">
                        <template slot-scope="scope">
                            <img :src="scope.row.img" width="40px">
                        </template>
                    </el-table-column>
                    <el-table-column property="title" label="곡명"/>
                    <el-table-column property="artist" label="아티스트"/>
                    <el-table-column property="album" label="앨범"/>
                    <el-table-column label="동작">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="playMusic(scope.row)">재생
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-main>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class PlayerBox extends Vue {
    private currentMusicObj: object = {};
    private tableData: any[] = [];

    private mounted() {
      this.reloadCurrentMusic();
      this.reloadPlayList();
    }

    private reloadCurrentMusic() {
      const musicUniqueId = this.$store.state.current_music;
      if (musicUniqueId !== '') {
        this.currentMusicObj = this.$store.state.music[musicUniqueId];
      } else {
        this.currentMusicObj = {};
      }
    }

    private reloadPlayList() {
      const playListUniqueId = this.$store.state.current_playlist;
      const result = [];
      for (const musicUniqueId of this.$store.state.playlist[playListUniqueId]) {
        result.push(this.$store.state.music[musicUniqueId]);
      }
      this.tableData = result;
    }

    private playMusic(musicObj: any) {
      this.$store.dispatch('setCurrentMusic', `${musicObj.type}-${musicObj.id}`);
      this.reloadCurrentMusic();
    }
  }
</script>

<style scoped>
    .current-play-box {
        margin: -20px -20px 0 -20px;
        padding: 20px 20px 20px 20px;
        background-color: #484848;
    }

    .album-img {
        float: left;
        margin-right: 20px;
    }

    .title-div {
        font-size: 25px;
        margin-top: 10px;
        text-shadow: 1px 1px #000000;
        color: white;
    }

    .artist-div {
        margin-top: 15px;
        color: white;
    }

    .album-div {
        margin-top: 5px;
        color: white;
    }
</style>
