<!-- 公共导入的路由页面 -->
<template>
  <div>
    <UploadExcel :on-success="success" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {

  name: '',

  components: {},

  props: {},

  data() {
    return {
    }
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    async success({ header, results }) {
      // 中英文的对应关系
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      // 遍历所有表格数据，得到item,单组数据
      const newArr = results.map(item => {
        // 创建空对象，保存替换后的数据
        const userInfo = {}
        Object.keys(item).forEach(key => {
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/'))
          } else {
            userInfo[userRelations[key]] = item[key]
          }
        })
        return userInfo
      })
      await importEmployee(newArr)
      this.$router.back()
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>
<style lang='less' scoped>

</style>
