<template>
<div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
        <image-g />
        <!-- <div class="sc">
            <el-radio-group size="mini" @change="onCollectChange(1)" v-model="collect">
                <el-radio-button  label="false">全部</el-radio-button>
                <el-radio-button  label="true">收藏</el-radio-button>
            </el-radio-group>
            <el-button @click="dialogVisible = true" size="mini">上传素材</el-button>
        </div>
        <el-row :gutter="10">
            <el-col v-for="(img,index) in images" :key="index" :lg="4" :xs="12" :md="6" :sm="6" class="image-item" >
                <el-image
                    style="height: 100px"
                    :src="img.url"
                    fit="cover">
                </el-image>
                <div class="image-action">
                  <el-button size="mini" type="warning" :icon="img.is_collected?'el-icon-star-on':'el-icon-star-off'" :loading="img.isloading"   circle @click="onCollect(img)"></el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="deleteimg(img)"></el-button>
                </div>
            </el-col>
        </el-row>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page.sync="page"
          @current-change="onchangepage"
          >
        </el-pagination> -->
    </el-card>
    <!-- <el-dialog
        title="上传素材"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        width="30%"
        :before-close="handleClose">
        <el-upload
            class="upload-demo"
            drag
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="upload"
            name="image"
            multiple
            :show-file-list="false"
            :on-success="onUploadSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-dialog> -->
</div>
</template>
<script>
// import { hqtp, putsctp, deleteImage } from '@/api/image'
import image from './comment/image'

export default {
  name: 'imagess',
  components: {
    'image-g': image
  },
  props: {},
  data () {
    return {}
    // const user = JSON.parse(window.localStorage.getItem('user'))
    // return {
    //   collect: false,
    //   images: [],
    //   dialogVisible: false,
    //   upload: {
    //     Authorization: `Bearer ${user.token}`
    //   },
    //   total: 0,
    //   pageSize: 10,
    //   page: 1
    // }
  },
  computed: {},
  watch: {},
  created () {
    // this.logimages(1, false)
  },
  mounted () {},
  methods: {
    // logimages (page) {
    //   hqtp({
    //     collect: this.collect,
    //     page,
    //     per_page: 18
    //   }).then(res => {
    //     // console.log(res)
    //     res.data.data.results.forEach(img => {
    //       img.isloading = false
    //     })
    //     this.pageSize = res.data.data.per_page
    //     this.total = res.data.data.total_count
    //     this.images = res.data.data.results
    //   })
    // },
    // onCollectChange () {
    // //   console.log(value)
    //   this.logimages()
    // },
    // handleClose () {
    //   this.dialogVisible = false
    // },
    // onUploadSuccess () {
    //   this.dialogVisible = false
    //   this.logimages()
    //   this.$message({
    //     type: 'success',
    //     message: '上传成功'
    //   })
    // },
    // onchangepage (value) {
    //   this.logimages(value, this.collect)
    // },
    // onCollect (img) {
    //   img.isloading = true
    //   putsctp(img.id, !img.is_collected).then(res => {
    //     img.is_collected = !img.is_collected
    //     img.isloading = false
    //     // this.logimages(this.page, false)
    //   })
    // },
    // deleteimg (img) {
    //   img.loading = true
    //   deleteImage(img.id).then(res => {
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功'
    //     })
    //     img.loading = false
    //     this.logimages(this.page)
    //   })
    // }
  }
}
</script>

<style scoped lang="less">
    // .sc{
    //     padding-bottom:20px;
    //     display: flex;
    //     justify-content: space-between;
    // }
    // .image-action{
    //   font-size: 25px;
    //   display: flex;
    //   justify-content: space-evenly;
    //   align-items: center;
    //   color: #fff;
    //   height: 40px;
    //   background-color: rgba(204, 204, 204, .5);
    //   position: absolute;
    //   bottom: 4px;
    //   left: 5px;
    //   right: 5px;
    // }
    // .image-item{
    //   position: relative;
    // }
</style>
