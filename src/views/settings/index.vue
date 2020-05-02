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
                <el-form ref="formName" :rules="rules" :model="user" label-width="80px">
                    <el-form-item label="编号">
                        {{user.id}}
                    </el-form-item>
                    <el-form-item label="手机">
                        {{user.mobile}}
                    </el-form-item>
                    <el-form-item label="媒体名称" prop="name">
                        <el-input v-model="user.name"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体介绍">
                        <el-input type="textarea" v-model="user.intro"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="updateUser" :loading="isload" type="primary">保存</el-button>
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
        @opened = "cjtx"
        @closed = "gbcj"
        :modal-append-to-body="false"
        width="30%">
        <div>
          <img class="touxiang" :src="tupian" ref="touxiang">
        </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" :loading="isload" @click="onUpdate">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>
<script>
import { getUserProfile, update, updateUserProfile } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globus from '@/utils/bus'
export default {
  name: 'user',
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
      tupian: '',
      cropper: '',
      isload: false,
      rules: {
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
        ]
      }
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
    },
    cjtx () {
      const image = this.$refs.touxiang
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'none',
        aspectRatio: 1,
        cropBoxResizable: false,
        movable: true,
        crop (event) {
          // console.log(event.detail.x)
          // console.log(event.detail.y)
          // console.log(event.detail.width)
          // console.log(event.detail.height)
          // console.log(event.detail.rotate)
          // console.log(event.detail.scaleX)
          // console.log(event.detail.scaleY)
        }
      })
    },
    gbcj () {
      this.cropper.destroy()
    },
    onUpdate () {
      this.isload = true
      this.cropper.getCroppedCanvas().toBlob(blob => {
        const fd = new FormData()
        fd.append('photo', blob)
        update(fd).then(res => {
          this.dialogVisible = false
          this.user.photo = window.URL.createObjectURL(blob)
          this.$message({
            type: 'success',
            message: '更新头像成功'
          })
          this.isload = false
          globus.$emit('user', this.user)
        })
      })
    },
    updateUser () {
      this.$refs.formName.validate((valid) => {
        if (!valid) {
          this.$message({
            type: 'success',
            message: '请输入正确得信息'
          })
          return false
        }
        this.isload = true
        updateUserProfile(this.user).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.isload = false
          globus.$emit('user', this.user)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  .touxiang{
    display: block;
  /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 200px;
  }
</style>
