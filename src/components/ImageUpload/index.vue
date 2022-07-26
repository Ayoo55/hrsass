<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :class="{disabled: fileComputed }"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :http-request="upload"
      :on-change="changeFile"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" :percentage="percent" style="width:180px" />
    <el-dialog :visible.sync="showDialog">
      <img :src="imgUrl" alt="" width="100%">
    </el-dialog>
  </div>

</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDf7JFuIQItDG3ZolSs2wax3sQikVzHJ4Y',
  SecretKey: 'FEwOZyA9sMaXEfpiMlqjMmxsWt0vaz94'
})
export default {

  name: '',

  components: {},

  props: {},

  data() {
    return {
      fileList: [{ url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp02%2F1Z9191923035R0-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661414627&t=3a717bff33a368b195f1871735aca44b' }],
      showDialog: false,
      imgUrl: '',
      currentFileUid: null,
      percent: 0,
      showPercent: false
    }
  },

  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },

  watch: {},

  created() {},

  methods: {
    // 预览图片
    preview(file) {
      this.showDialog = true
      this.imgUrl = file.url
    },
    // 删除文件
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    // 上传图片前判断图片格式
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false // 上传终止
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小最大不能超过5M')
        return false // 上传终止
      }
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    // 添加文件,on-change,文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    //    http-reques ，覆盖默认的上传行为，可以自定义上传的实现
    upload(params) {
      //   执行上传操作
      if (params.file) {
        cos.putObject({
          Bucket: 'picture-1313084847',
          Region: 'ap-nanjing',
          Key: params.file.name,
          Body: params.file,
          StorageClass: 'STANDARD',
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          console.log(err || data)
          //   说明上传成功
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
          }
          setTimeout(() => {
            this.showPercent = false
            this.percent = 0
          }, 1000)
        })
      }
    }
  }
}
</script>
<style>
.disabled .el-upload--picture-card{
    display:none;
}
</style>
