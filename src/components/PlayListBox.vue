<template>
    <el-main>
        <el-button type="primary" @click="openAddDialog">플레이리스트 추가</el-button>
        <el-dialog
                title="플레이리스트 추가"
                :visible.sync="addDialogVisible"
                width="30%">
            <span>
                <el-input placeholder="플레이리스트명을 입력해주세요." v-model="inputPlayListName"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">취소</el-button>
                <el-button type="primary" @click="addPlayList">등록</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="플레이리스트 편집"
                :visible.sync="editDialogVisible"
                width="50%">
            <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    filter-placeholder="검색어를 입력하시오."
                    :titles="['전체 음원 목록', '플레이리스트']"
                    v-model="currentMusicList"
                    :data="musicList">
            </el-transfer>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">취소</el-button>
                <el-button type="primary" @click="savePlayList">저장</el-button>
            </span>
        </el-dialog>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index"/>
            <el-table-column prop="name" label="플레이리스트명"/>
            <el-table-column prop="cnt" label="곡 수"/>
            <el-table-column label="동작">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="playMusicList(scope.row)">재생
                    </el-button>
                    <el-button
                            size="mini"
                            @click="editMusicList(scope.row)">편집
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="deleteMusicList(scope.row)">삭제
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-main>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class PlayListBox extends Vue {
    private addDialogVisible: boolean = false;
    private editDialogVisible: boolean = false;
    private inputPlayListName: string = '';
    private editPlayListName: string = '';
    private musicList: any = [];
    private currentMusicList: any = [];
    private tableData: any[] = [];

    private async mounted() {
      this.reloadTableData();
    }

    private filterMethod(find: any, item: any) {
      return item.label.toLowerCase().indexOf(find.toLowerCase()) > -1;
    }

    private reloadTableData() {
      const playlist = this.$store.state.playlist;
      const result = [];
      for (const item in playlist) {
        result.push({
          name: item,
          cnt: playlist[item].length,
        });
      }
      this.tableData = result;
    }

    private reloadEditData() {
      const music = this.$store.state.music;
      const result = [];
      for (const item in music) {
        result.push({
          key: item,
          label: `${music[item].artist} - ${music[item].title}`,
        });
      }
      this.musicList = result;
      this.currentMusicList = this.$store.state.playlist[this.editPlayListName];
    }

    private openAddDialog() {
      this.inputPlayListName = '';
      this.addDialogVisible = true;
    }

    private addPlayList() {
      if (this.inputPlayListName === '') {
        this.$message.error('내용을 입력해주시기 바랍니다.');
        return;
      }
      if (this.inputPlayListName in this.$store.state.playlist) {
        this.$message.error('이미 존재하는 플레이리스트명 입니다.');
        return;
      }
      this.$store.dispatch('addPlayList', {
        name: this.inputPlayListName,
      });
      this.addDialogVisible = false;
      this.reloadTableData();
      this.$message.success('성공적으로 등록되었습니다.');
    }

    private savePlayList() {
      this.$store.dispatch('setPlayListItem', {
        name: this.editPlayListName,
        data: this.currentMusicList,
      });
      this.editDialogVisible = false;
      this.reloadTableData();
      this.$message.success('성공적으로 저장되었습니다.');
    }

    private playMusicList(musicListObj: any) {
      this.$message.info(`'${musicListObj.name}' 을 재생합니다.`);
      this.$store.dispatch('setCurrentPlayList', musicListObj.name);
      this.$store.dispatch('setCurrentMusic', this.$store.state.playlist[musicListObj.name][0]);
    }

    private editMusicList(musicListObj: any) {
      this.editPlayListName = musicListObj.name;
      this.reloadEditData();
      this.editDialogVisible = true;
    }

    private deleteMusicList(musicListObj: any) {
      if (musicListObj.name === '기본 재생목록') {
        this.$message.error('기본 재생목록은 삭제할 수 없습니다.');
        return;
      }
      this.$confirm(`정말로 '${musicListObj.name}' 을 삭제하시겠습니까?`, '경고', {
        confirmButtonText: '예',
        cancelButtonText: '아니오',
        type: 'warning',
      }).then(() => {
        this.$store.dispatch('removePlayList', musicListObj);
        this.reloadTableData();
        this.$message.success('성공적으로 삭제되었습니다.');
      }).catch(() => {
        this.$message.info('취소되었습니다.');
      });
    }
  }
</script>

<style>
    .el-transfer-panel {
        width: 400px;
    }
</style>
