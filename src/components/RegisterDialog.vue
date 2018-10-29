<template>
    <el-row>
        <el-button
                type="info"
                style="width: 100%; margin-top: 5px;"
                size="mini"
                @click="dialogVisible = true">회원가입
        </el-button>
        <el-dialog
                title="회원가입"
                :visible.sync="dialogVisible"
                width="30%">
            <el-input placeholder="아이디" v-model="inputId" autofocus/>
            <el-input placeholder="비밀번호" v-model="inputPw" type="password"/>
            <el-input placeholder="비밀번호 확인" v-model="inputPw2" type="password"/>
            <el-input placeholder="이메일 주소" v-model="inputEmail"/>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">취소</el-button>
                <el-button type="primary" @click="registerClick">회원가입</el-button>
            </span>
        </el-dialog>
    </el-row>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class RegisterDialog extends Vue {
    private dialogVisible: boolean = false;
    private inputId: string = '';
    private inputPw: string = '';
    private inputPw2: string = '';
    private inputEmail: string = '';

    private registerClick() {
      if (!this.inputId) {
        this.$message.warning('아이디를 입력해주시기 바랍니다.');
        return;
      }
      if (!this.inputPw) {
        this.$message.warning('비밀번호를 입력해주시기 바랍니다.');
        return;
      }
      if (!this.inputPw2) {
        this.$message.warning('비밀번호 확인을 입력해주시기 바랍니다.');
        return;
      }
      if (this.inputPw !== this.inputPw2) {
        this.$message.warning('비밀번호 확인이 일치하지 않습니다.');
        return;
      }
      if (!this.inputEmail) {
        this.$message.warning('이메일 주소를 입력해주시기 바랍니다.');
        return;
      }
      this.dialogVisible = false;
      this.$message.success('성공적으로 회원가입 되었습니다.');
    }
  }
</script>

<style scoped>
    .el-input {
        margin-bottom: 10px;
    }
</style>
