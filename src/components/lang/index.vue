<template>
  <div>
    <el-dropdown @command="changeLanguage">
      <!-- 显示图标 -->
      <div>
        <svg-icon style="color:#fff;font-size:20px" icon-class="language" />
      </div>
      <!-- 下拉图标 -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :disabled="'zh'=== $i18n.locale " command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="'en'=== $i18n.locale " command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
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
    changeLanguage(type) {
      Cookie.set('language', type)
      this.$i18n.locale = type
      this.$message.success('切换多语言成功')
    }
  }
}
</script>
<style>

</style>
