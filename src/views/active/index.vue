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
    <el-radio-group v-model="form.resource">
      <el-radio label="全部"></el-radio>
      <el-radio label="草稿"></el-radio>
      <el-radio label="待审核"></el-radio>
      <el-radio label="审核通过"></el-radio>
      <el-radio label="审核失败"></el-radio>
      <el-radio label="已删除"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道">
    <el-select v-model="form.region" placeholder="请选择频道">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="日期">
    <el-col :span="11">
      <el-time-picker is-range
    v-model="form.data"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    placeholder="选择时间范围"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
</el-card>
<el-card class="box-card clearfix-card">
  <div slot="header" class="clearfix">
    <span>根据筛选条件查询到 46147 条结果</span>
  </div>
  <el-table
  class="list-table"
  size="mini"
    border
    stripe
      :data="active"
      style="width: 100%">
      <el-table-column
        prop="cover"
        label="封面"
        width="180">
        <template >
          <img src="" alt="">
      </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag type="success" v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag type="warning" v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag type="info" v-else-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === 4">已删除</el-tag>
          </div>
      </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
</el-card>
    </div>
</template>
<script>
import { getActive } from '@/api/active'
export default {
  name: 'activeindex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      active: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadActive()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadActive () {
      getActive().then(res => {
        this.active = res.data.data.results
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
</style>
