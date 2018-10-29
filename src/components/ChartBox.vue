<template>
    <el-main>
        <el-card class="box-card">
            <div slot="header">
                <span>실시간 차트</span>
            </div>
            <el-row>
                <el-button type="primary" @click="addPlayList" size="mini">플레이리스트 추가</el-button>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column width="72">
                        <template slot-scope="scope">
                            <img :src="scope.row.img" width="40px">
                        </template>
                    </el-table-column>
                    <el-table-column property="title" label="곡명"/>
                    <el-table-column property="artist" label="아티스트"/>
                    <el-table-column property="album" label="앨범"/>
                </el-table>
            </el-row>
        </el-card>
    </el-main>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class ChartBox extends Vue {
    private tableData: any[] = [];
    private multipleSelection: any[] = [];
    private $http: any;

    private async mounted() {
      const result = await this.$http.get('/mock/chart.json');
      this.tableData = result.data;
    }

    private handleSelectionChange(val: any) {
      this.multipleSelection = val;
    }

    private addPlayList() {
      const data = this.multipleSelection;
      for (const item of data) {
        this.$store.dispatch('addMusic', {
          id: item.id,
          type: item.type,
          title: item.title,
          artist: item.artist,
          album: item.album,
          img: item.img,
          play: item.play,
        });
        this.$store.dispatch('addPlayListItem', {
          name: '기본 재생목록',
          data: `${item.type}-${item.id}`,
        });
      }
      this.$refs.multipleTable.clearSelection();
      this.$message.success('성공적으로 추가되었습니다.');
    }
  }
</script>
