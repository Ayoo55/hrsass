<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="before">共16条记录</span>
        <template v-slot:after>
          <el-button size="small" type="success">Excel导入</el-button>
          <el-button size="small" type="danger">Excel导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </PageTools>

      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <el-table border :data="list">
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column prop="username" label="姓名" sortable="" />
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column prop="formOfEmployment" :formatter="formatEmployment" label="聘用形式" sortable="" />
          <el-table-column prop="departmentName" label="部门" sortable="" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable="" />
          <el-table-column prop="enableState" label="账户状态" sortable="" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :total="page.total"
            :current-page="page.page"
            @current-change="changePage"
          />
        </el-row>
      </el-card>

    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
export default {
  data() {
    return {
      list: [], // 员工列表数据
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      loading: false

    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const list = await getEmployeeList(this.page)
      this.page.total = list.total
      this.list = list.rows
      this.loading = false
    },
    // 更改页码
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      // 找到所有 hireType 里，与 cellvalue 相同的对象
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    }
  }
}
</script>

<style>

</style>

