<template>
  <div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-form ref="form" :model="form" label-width="40px" size="mini">
      <el-form-item label="状态">
    <el-radio-group v-model="radio">
      <el-radio :label="null">全部</el-radio>
      <el-radio :label="0">草稿</el-radio>
      <el-radio :label="1">待审核</el-radio>
      <el-radio :label="2">审核通过</el-radio>
      <el-radio :label="3">审核失败</el-radio>
      <el-radio :label="4">已删除</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道">
    <el-select v-model="ActivechannelsId"  placeholder="请选择频道">
      <el-option v-for="(iteam, index) in Activechannels" :label="iteam.name" :value="iteam.id" :key="index" ></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="日期">
    <el-date-picker
      v-model="fromDate"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00']"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="loadActive(1)" :disabled="isdisabled">查询</el-button>
  </el-form-item>
</el-form>
</el-card>
<el-card class="box-card clearfix-card">
  <div slot="header" class="clearfix">
    <span>根据筛选条件查询到 {{ totalcount }} 条结果</span>
  </div>
  <el-table
  v-loading="loading"
  class="list-table"
  size="mini"
    border
    stripe
      :data="active"
      style="width: 100%">
      <el-table-column
      align='center'
        prop="cover"
        label="封面"
        >
        <template slot-scope="scope">
          <el-tag>
            <img v-if="scope.row.cover.images[0]" class="ative-img" :src="scope.row.cover.images[0]" alt="">
            <img v-else class="ative-img" src="@/views/login/login_bg.jpg" alt="">
          </el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        align='center'
        >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align='center'
        >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag  :type="activestatus[scope.row.status].type">
              {{ activestatus[scope.row.status].text }}
            </el-tag>
            <!-- <el-tag type="success" v-if="scope.row.status === 0"></el-tag>
            <el-tag type="warning" v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag type="info" v-else-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === 4">已删除</el-tag> -->
          </div>
      </template>
      </el-table-column>
      <el-table-column
      align='center'
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
      align='center'
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="$router.push('/publish?id='+scope.row.id.toString())"  type="primary" icon="el-icon-edit" circle></el-button>
        <el-button @click="onDelet(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  <el-pagination
  :disabled="isdisabled"
  background
  layout="prev, pager, next"
  :total="totalcount"
  @current-change="oncurrent"
  :page-size="pagesize">
</el-pagination>
</el-card>
    </div>
</template>
<script>
import { getActive, getActivechannels, deletActivechannels } from '@/api/active'
export default {
  name: 'activeindex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      active: [],
      activestatus: [
        { status: 0, text: '草稿', type: 'success' },
        { status: 1, text: '待审核', type: 'warning' },
        { status: 2, text: '审核通过', type: '' },
        { status: 3, text: '审核失败', type: 'info' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      totalcount: 0,
      pagesize: 10,
      radio: null,
      Activechannels: [],
      ActivechannelsId: null,
      loading: true,
      isdisabled: false,
      fromDate: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadActive(1)
    this.logetActivechannels()
  },
  mounted () {},
  methods: {
    loadActive (page) {
      this.isdisabled = true
      this.loading = true
      getActive({
        page,
        per_page: 10,
        status: this.radio,
        channel_id: this.ActivechannelsId,
        begin_pubdate: this.fromDate[0],
        end_pubdate: this.fromDate[1]
      }).then(res => {
        // console.log(this.ActivechannelsId)
        const { results, per_page: peapage, total_count: total } = res.data.data
        this.active = results
        this.totalcount = total
        this.pagesize = peapage
        this.loading = false
        this.isdisabled = false
      })
    },
    oncurrent (page) {
      this.loadActive(page)
      // console.log(page)
    },
    logetActivechannels () {
      getActivechannels().then(res => {
        // console.log(res)
        this.Activechannels = res.data.data.channels
      })
    },
    onDelet (id) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletActivechannels(id.toString()).then(res => {
          console.log(id)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  .clearfix-card{
    margin-top: 30px;
  }
  .list-table{
    margin-bottom: 20px;
  }
  .ative-img{
    width: 100px;
    background-size: cover;
  }
</style>
