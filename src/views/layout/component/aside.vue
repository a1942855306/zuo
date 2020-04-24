<template>
  <el-menu
      default-active="/"
      class="el-menu-vertical-demo"
      background-color="#002033"
      text-color="#fff"
      router
      :collapse="isCollapse"
      active-text-color="#ffd04b">
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/active">
        <i class="iconfont icon-l-order"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
       <el-menu-item index="/image">
        <i class="iconfont icon-image"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="iconfont icon-publish"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/commit">
        <i class="el-icon-setting"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="el-icon-menu"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="el-icon-menu"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>

</template>

<script>
export default {
  props: ['is-collapse']
}
</script>

<style lang="less" scoped>
    .icon-image,
    .icon-publish,
    .icon-l-order{
        margin-right: 10px;
        margin-left: 5px;
    }
</style>
