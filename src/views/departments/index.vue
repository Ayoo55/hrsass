<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <!-- 头部 -->
      <el-card class="tree-card">
        <TreeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />

        <!-- 树形结构 -->
        <el-tree :data="departs" :porps="defaultProps" :default-expand-all="true">
          <!-- slot-scope 插槽 -->
          <TreeTools
            slot-scope="{data}"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>

      <AddDept
        ref="addDept"
        :show-dialog.sync="showDialog"
        :tree-node="node"
        @addDepts="getDepartments"
      />
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { },
      showDialog: false,
      node: null // 记录当前点击的node节点
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 获取企业的部门列表
    async getDepartments() {
      const data = await getDepartments()
      this.company = { name: data.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(data.depts, '')
    },
    // 新增部门
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    // 编辑部门
    editDepts(node) {
      // 弹层显示
      this.showDialog = true
      // 记录当前点击的节点
      this.node = node
      // 弹层内部填充当前节点信息，父组件调用子组件，获取详情
      // 在调用**编辑方法** **`editDepts`**中通过**`ref`**调用**`add-dept.vue`**的实例方法
      this.$refs.addDept.getDepartDetail(node.id)
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

