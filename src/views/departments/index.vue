<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <!-- 头部 -->
      <el-card class="tree-card">
        <!-- 第一行felx布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height:40px">
          <!-- 第一列 -->
          <el-col>江苏传智播客教育科技股份有限公司</el-col>
          <!-- 第二列 -->
          <el-col :span="4">
            <!-- 第二列内容增加一个flex布局的行 -->
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <!-- 下拉操作 -->
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作
                    <i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <!-- 树形结构 -->
        <el-tree :data="departs" :porps="defaultProps" :default-expand-all="true">
          <el-row slot-scope="{ data }" type="flex" justify="space-between" align="middle" style="height:40px;width:100%">
            <!-- 第一列 -->
            <el-col>{{ data.name }}</el-col>
            <!-- 第二列 -->
            <el-col :span="4">
              <!-- 第二列内容增加一个flex布局的行 -->
              <el-row type="flex" justify="end">
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <!-- 下拉操作 -->
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作
                      <i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }
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

