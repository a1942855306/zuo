<template>
    <div>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >{{ $route.query.id ? '修改文章' : '发表文章'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :model="active"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="name">
                <el-input v-model="active.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="desc">
                <el-input type="textarea" v-model="active.content"></el-input>
            </el-form-item>
            <el-form-item label="封面">
                <el-radio-group v-model="active.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
                <el-select v-model="active.channel_id"  placeholder="请选择频道">
                <el-option v-for="(iteam, index) in Activechannels" :label="iteam.name" :value="iteam.id" :key="index" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fabiao(false)">发表</el-button>
                <el-button @click="fabiao(true)">存入草稿</el-button>
            </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { getActivechannels, fabiaoactive, xiugai, huoqu } from '@/api/active'
export default {
  name: 'publiindex',
  components: {},
  props: {},
  data () {
    return {
      Activechannels: [],
      active: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.logetActivechannels()
    if (this.$route.query.id) {
      this.loadjiazai(this.$route.query.id)
    }
  },
  mounted () {},
  methods: {
    logetActivechannels () {
      getActivechannels().then(res => {
        // console.log(res)
        this.Activechannels = res.data.data.channels
      })
    },
    fabiao (draft = false) {
      const charid = this.$route.query.id
      if (charid) {
        xiugai(charid, this.active, draft).then(res => {
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success'
          })
          // 跳转到内容管理页面
          this.$router.push('/active')
        })
      } else {
        fabiaoactive(this.active, draft).then(res => {
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success'
          })
          // 跳转到内容管理页面
          this.$router.push('/active')
        })
      }
    },
    loadjiazai (id) {
      huoqu(id).then(res => {
        console.log(res)
        this.active = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
