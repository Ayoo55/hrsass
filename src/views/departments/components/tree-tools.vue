<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width: 100%">
    <el-col>
      <!-- 名称应该变成 对应的节点中的name -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="operateDepts">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {

  name: 'TreeTools',

  components: {},

  props: {
    // treeNode 相当于当前的节点
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
    }
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    operateDepts(type) {
      if (type === 'add') {
        // 在当前点击的部分下添加子部门，this.treeNode就是当前部门
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        console.log('edit')
      } else {
        this.$confirm('确定要删除该部门吗？').then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          //  如果删除成功了  就会进入这里
          this.$emit('delDepts') // 触发自定义事件
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>
<style scoped>

</style>
