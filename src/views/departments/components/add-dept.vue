<template>
  <div>
    <!-- 放置弹层组件 -->
    <el-dialog title="新增部门" :visible="true">
      <!-- 表单数据 -->
      <el-form label-width="120px">
        <el-form-item label="部门名称">
          <el-input style="width:80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input style="width:80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门负责人">
          <el-input style="width:80%" placeholder="请选择" />
        </el-form-item>
        <el-form-item label="部门介绍">
          <el-input style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>

      <!-- 确定/取消 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small">确定</el-button>
          <el-button size="small">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {

  name: 'AddDept',

  components: {},

  props: {},

  data() {
    return {
    }
  },

  computed: {},

  watch: {},

  created() {},

  methods: {}
}
</script>
<style lang='less' scoped>

</style>