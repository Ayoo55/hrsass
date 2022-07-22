<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <!-- 头部 -->
      <el-card class="tree-card">
        <TreeTools :tree-node="company" :is-root="true" />

        <!-- 树形结构 -->
        <el-tree :data="departs" :porps="defaultProps" :default-expand-all="true">
          <!-- slot-scope 插槽 -->
          <TreeTools slot-scope="{data}" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { }
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const data = await getDepartments()
      this.company = { name: data.companyName, manager: '负责人' }
      this.departs = tranListToTreeData(data.depts, '')
    }
  }
}
</script>

<style scoped>
.tree-card{
  padding: 30px 140px;
  font-size: 14px;
}
</style>

