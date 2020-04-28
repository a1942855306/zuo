<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row>
            <el-col :span="12">
                <el-form ref="form" :model="user" label-width="80px">
                    <el-form-item label="编号">
                        {{user.id}}
                    </el-form-item>
                    <el-form-item label="手机">
                        {{user.mobile}}
                    </el-form-item>
                    <el-form-item label="媒体名称">
                        <el-input v-model="user.name"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体介绍">
                        <el-input type="textarea" v-model="user.intro"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :offset="4" :span="4">
                <template>
                    <label for="file">
                    <el-avatar shape="square" :size="200" :src="user.photo"></el-avatar>
                    <p>点击修改头像</p>
                    </label>
                    <input type="file" hidden ref="file" id="file" @change="onchangetx">
                </template>
            </el-col>
        </el-row>
        <el-dialog
        title="修改头像"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        width="30%">
            <img :src="tupian" alt="">
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>
<script>
import { getUserProfile } from '@/api/user'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      user: {
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      },
      dialogVisible: false,
      tupian: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loginuser()
  },
  mounted () {},
  methods: {
    loginuser () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onchangetx () {
      const file = this.$refs.file
      const fileurl = window.URL.createObjectURL(file.files[0])
      this.tupian = fileurl
      this.dialogVisible = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
</style>
