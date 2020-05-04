<template>
  <div>
    <div class="cover-wrap" @click="showCoverSelect">
        <img ref="cover-img" class="cover-img" :src="value" alt="">
    </div>
    <el-dialog
        :modal-append-to-body='false'
        title="选择封面"
        width="30%"
        :visible.sync="dialogVisible"
        >
        <el-tabs model="second" type="card">
            <el-tab-pane label="素材库" name="first">素材库</el-tab-pane>
            <el-tab-pane label="上传图片" name="second">
                <input ref="file" type="file" @change="onphoto"><br>
                <img ref="preview-imag" src="" alt="">
            </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="oncover" :loading="isloding">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import { sctp } from '@/api/image'
export default {
  name: 'uoload',
  components: {},
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'second',
      isloding: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onphoto () {
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-imag'].src = blob
    //   this.$refs.file.value = ''
    },
    showCoverSelect () {
      this.dialogVisible = true
    },
    oncover () {
      this.isloding = true
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择文件')
          return false
        }
        const fd = new FormData()
        fd.append('image', file)
        sctp(fd).then(res => {
          // console.log(res)
          this.dialogVisible = false
          this.$refs['cover-img'].src = res.data.data.url
          this.$emit('input', res.data.data.url)
          this.isloding = false
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cover-wrap{
  width: 150px;
  height: 120px;
  border: 1px solid #000;
  .cover-img{
    height: 120px;
    max-width: 100%;
  }
}
</style>
