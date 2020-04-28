<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>评论管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
          <el-table
            :data="table"
            stripe
            style="width: 100%">
            <el-table-column
              prop="title"
              label="标题"
              width="180">
            </el-table-column>
            <el-table-column
              prop="total_comment_count"
              label="总评论数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="fans_comment_count"
              label="粉丝评论数">
            </el-table-column>
            <el-table-column
              prop="address"
              label="状态">
              <template slot-scope="scope">
                {{scope.row.comment_status ? '正常' : '关闭'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.comment_status"
                  active-color="#13ce66"
                  :disabled="scope.row.statusDisabled"
                  @change = "onchangkg(scope.row)"
                  inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
          </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total_count">
        </el-pagination>
      </el-card>
    </div>
</template>
<script>
import { getActive, xgplzt } from '@/api/active'
export default {
  name: 'plgl',
  components: {},
  props: {},
  data () {
    return {
      table: [],
      pageSize: 10,
      page: 1,
      total_count: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getpl(1, this.pageSize)
  },
  mounted () {},
  methods: {
    handleSizeChange (val) {
      this.getpl(1, val)
    },
    handleCurrentChange (val) {
      this.getpl(val)
    },
    getpl (page = 1) {
      getActive({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        console.log(res)
        this.total_count = res.data.data.total_count
        res.data.data.results.forEach(ele => {
          ele.statusDisabled = false
        })
        this.table = res.data.data.results
      })
    },
    onchangkg (iteam) {
      // console.log(iteam)
      iteam.statusDisabled = true
      xgplzt(iteam.id.toString(), iteam.comment_status).then(res => {
        iteam.statusDisabled = false
        this.$message({
          type: 'success',
          message: iteam.comment_status ? '开启文章评论状态' : '关闭文章评论状态'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
