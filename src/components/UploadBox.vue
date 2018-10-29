<template>
    <el-main>
        <el-card class="box-card">
            <div slot="header">
                <span>음원 업로드</span>
            </div>
            <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :before-upload="beforeMusicUpload"
                    multiple
                    :file-list="fileList">
                <el-button size="small" type="primary">클릭하여 업로드</el-button>
                <div slot="tip" class="el-upload__tip">10MB 이하의 MP3 파일만 업로드가 가능합니다.</div>
            </el-upload>
        </el-card>
        <el-card class="box-card">
            <div slot="header">
                <span>YouTube 등록</span>
            </div>
            <el-input placeholder="주소를 입력해주세요." v-model="inputYoutubeLink">
                <el-button slot="append" @click="youtubeUpload">등록</el-button>
            </el-input>
        </el-card>
    </el-main>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  declare var require: (moduleId: string) => any;
  const getYouTubeID = require('get-youtube-id');

  @Component
  export default class UploadBox extends Vue {
    private fileList: any[] = [];
    private inputYoutubeLink: string = '';

    private beforeMusicUpload(file: any) {
      const isMP3 = file.type === 'audio/mpeg';
      const isLt10M = file.size / 1024 / 1024 <= 10;
      if (!isMP3) {
        //this.$message.error('MP3 파일만 업로드가 가능합니다.');
        //return false;
      }
      if (!isLt10M) {
        this.$message.error('용량은 10MB를 넘을 수 없습니다.');
        return false;
      }
      this.$store.dispatch('addMusic', {
        id: file.name,
        type: 'upload',
        title: `Upload - ${file.name}`,
        artist: 'Dummy',
        album: 'Dummy',
        img: 'https://swcamp.cpsoft.co.kr/image/10001.jpg',
        play: 'https://swcamp.cpsoft.co.kr/music/10001.mp3',
      });
      this.$store.dispatch('addPlayListItem', {
        name: '기본 재생목록',
        data: `upload-${file.name}`,
      });
      return isMP3 && isLt10M;
    }

    private youtubeUpload() {
      const youtubeId = getYouTubeID(this.inputYoutubeLink);
      if (youtubeId === null) {
        this.$message.error('잘못된 YouTube 주소입니다.');
        return;
      }
      this.$store.dispatch('addMusic', {
        id: youtubeId,
        type: 'youtube',
        title: `YouTube - ${youtubeId}`,
        artist: 'Dummy',
        album: 'Dummy',
        img: 'https://swcamp.cpsoft.co.kr/image/10000.jpg',
        play: 'https://swcamp.cpsoft.co.kr/music/10000.mp3',
      });
      this.$store.dispatch('addPlayListItem', {
        name: '기본 재생목록',
        data: `youtube-${youtubeId}`,
      });
      this.inputYoutubeLink = '';
      this.$message.success('등록되었습니다.');
    }
  }
</script>

<style scoped>
    .el-card {
        margin-bottom: 30px;
    }
</style>
