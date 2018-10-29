<template>
    <el-main>
        <el-row type="flex" justify="center" class="logo">
            <img alt="Logo" src="../assets/logo.png">
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="5">
                <el-card class="box-card">
                    <el-input placeholder="아이디" v-model="inputId" autofocus/>
                    <el-input placeholder="비밀번호" v-model="inputPw" type="password"/>
                    <el-row>
                        <el-button type="primary" class="login-button" @click="loginClick">
                            로그인
                        </el-button>
                    </el-row>
                    <RegisterDialog/>
                </el-card>
            </el-col>
        </el-row>
    </el-main>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import RegisterDialog from '@/components/RegisterDialog.vue';

  @Component({
    components: {
      RegisterDialog,
    },
  })
  export default class Home extends Vue {
    private inputId: string = '';
    private inputPw: string = '';

    private loginClick() {
      if (!this.inputId || !this.inputPw) {
        this.$message.warning('아이디 혹은 비밀번호를 입력해주시기 바랍니다.');
        return;
      }
      this.$router.push('/player');
    }

    private mounted() {
      document.body.classList.add('body-style');
    }

    private destroyed() {
      document.body.classList.remove('body-style');
    }

  }
</script>

<style>
    .body-style {
        background: url('../assets/bg.jpg') no-repeat;
        background-size: cover;
    }
</style>

<style scoped>
    .logo {
        margin-top: 100px;
        margin-bottom: 40px;
    }

    .el-input {
        margin-bottom: 10px;
    }

    .login-button {
        width: 100%;
    }
</style>
