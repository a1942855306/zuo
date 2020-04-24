<template>
     <el-container class="layout-container" >
  <el-aside class="aside"  width="auto">
      <app-aside  :is-collapse="isCollapse" class="aside-menu"></app-aside>
  </el-aside>
  <el-container>
    <el-header class="header">
        <div class="header-container">
    <div>
        <i class="el-icon-s-fold" @click="isCollapse=!isCollapse"> </i>
        江苏传智播客有限公司
    </div>
    <el-dropdown>
        <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native="olginout">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</div>
    </el-header>
    <el-main class="main">
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import AppAside from './component/aside'
import { getUserProfile } from '@/api/user'
export default {
  name: 'index',
  data () {
    return {
      user: {},
      isCollapse: false
    }
  },
  components: {
    AppAside
  },
  created () {
    this.getUserProfile()
  },
  methods: {
    getUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    olginout () {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .layout-container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .header{
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // height: 100%;
            border-bottom: 1px solid #ccc;
        }
        .aside-menu{
            height: 100%;
            // background: pink;
        }
    }
    .header-container{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        .avatar-wrap{
        display: flex;
        align-items: center;
        .avatar{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
        }
        }
    }
</style>
