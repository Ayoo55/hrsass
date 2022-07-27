<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <el-button slot="after" type="primary" size="small">添加权限</el-button>
      </PageTools>
      <el-table border :data="list" row-key="id">
        <el-table-column align="center" label="菜单名称" prop="name" />
        <el-table-column align="center" label="权限标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button v-if="row.type===1" type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>

        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { tranListToTreeData } from '@/utils/index'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.list = tranListToTreeData(await getPermissionList(), '0')
      console.log(this.list)
    }
  }
}
</script>

<style>

</style>

