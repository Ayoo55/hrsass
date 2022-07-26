<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog">
      <img :src="imgUrl" alt="" width="100%">
    </el-dialog>
  </div>

</template>

<script>
export default {

  name: '',

  components: {},

  props: {},

  data() {
    return {
      fileList: [{ url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp02%2F1Z9191923035R0-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661414627&t=3a717bff33a368b195f1871735aca44b' }],
      showDialog: false,
      imgUrl: ''
    }
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    preview(file) {
      this.showDialog = true
      this.imgUrl = file.url
      console.log(file)
    }
  }
}
</script>
<style lang='less' scoped>

</style>
