<template>
    <div>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >{{ $route.query.id ? '修改文章' : '发表文章'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form
        :model="active"
        :rules="formRules"
        label-width="60px"
        ref="publish-form"
        >
            <el-form-item label="标题" prop="title">
                <el-input v-model="active.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="conter">
                <el-tiptap placeholder="请输入内容" height="400" v-model="active.content" :extensions="extensions"></el-tiptap>
            </el-form-item>
            <el-form-item label="封面">
                <el-radio-group v-model="active.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
                <template v-if="active.cover.type>0">
                  <upload-cover
                    v-for="(cover, index) in active.cover.type" :key="cover" @cover = "onupload(index, $event)" :cover = "active.cover.images[index]"
                  />
                </template>
            </el-form-item>
            <el-form-item label="频道" prop="pindao">
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
import { sctp } from '@/api/image'
import upload from './component/upload'
// import { ElementTiptap } from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import {
  // 需要的 extensions
  // Image,
  ElementTiptap,
  // Doc,
  // Text,
  // Paragraph,
  // Heading,
  // Bold,
  // Underline,
  // Italic,
  // Strike,
  // ListItem,
  // BulletList,
  // OrderedList,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Link,
  Image,
  Iframe,
  CodeBlock,
  Blockquote,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  TextAlign,
  Indent,
  LineHeight,
  HorizontalRule,
  HardBreak,
  TrailingNode,
  History,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  FormatClear,
  TextColor,
  TextHighlight,
  Preview,
  Print,
  Fullscreen,
  SelectAll,
  FontType
} from 'element-tiptap'
export default {
  name: 'publiindex',
  components: {
    'el-tiptap': ElementTiptap,
    'upload-cover': upload
  },
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
      },
      extensions: [
        // new Doc(),
        // new Text(),
        // new Paragraph(),
        // new Heading({ level: 5 }),
        // new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        // new Underline(),
        // new Italic(),
        // new Strike(),
        // new ListItem(),
        // new BulletList(),
        // new OrderedList(),
        // new Image(),
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new Link(),
        new Image({
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return sctp(fd).then(res => {
              return res.data.data.url
            })
            // return
          }
        }),
        new Iframe(),
        new CodeBlock(),
        new Blockquote(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new TextAlign(),
        new Indent(),
        new LineHeight(),
        new HorizontalRule(),
        new HardBreak(),
        new TrailingNode(),
        new History(),
        new Table(),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new FormatClear(),
        new TextColor(),
        new TextHighlight(),
        new Preview(),
        new Print(),
        new Fullscreen(),
        new SelectAll(),
        new FontType()
      ],
      formRules: {
        title: [
          { required: true, message: '请输入标题名称', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        conter: [
          {
            validator (rule, value, callback) {
              console.log('content validator')
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        pindao: [
          { required: true, message: '请选择文章频道' }
        ]
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
      this.$refs['publish-form'].validate(valid => {
        // 验证失败，停止提交表单
        if (!valid) {
          return
        }
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
      })
    },
    loadjiazai (id) {
      huoqu(id).then(res => {
        // console.log(res)
        this.active = res.data.data
      })
    },
    onupload (index, url) {
      // console.log(url)
      this.active.cover.images[index] = url
    }
  }
}
</script>

<style scoped lang="less">
</style>
