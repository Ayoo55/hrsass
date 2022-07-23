<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <!-- 表格 -->
          <el-row style="height:60px">
            <el-button icon="el-icon-plus" type="primary" size="small" @click="showDialog=true">新增角色</el-button>
          </el-row>
          <el-table
            border=""
            :data="list"
          >
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="120"
            />
            <el-table-column
              align="center"
              prop="name"
              label="角色名称"
              width="240"
            />
            <el-table-column
              align="center"
              prop="description"
              label="描述"
            />
            <el-table-column
              align="center"
              label="操作"
            >
              <template slot-scope="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click.native="editRole(row)">编辑</el-button>
                <el-button size="small" type="danger" @click.native="deleteRole(row)">删除</el-button>
              </template>

            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-row type="flex" justify="center" align="middle" style="height:60px">
            <el-pagination
              layout="prev, pager, next"
              :current-page="page.page"
              :total="page.total"
              :page-size="page.pagesize"
              @current-change="changePage"
            />
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="formDate.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <!-- v-mode 同步 formDate 信息 -->
              <el-input v-model="formDate.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="formDate.companyPhone" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="formDate.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="formDate.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 弹层组件 -->
    <el-dialog title="编辑角色" :visible="showDialog" @close="btnCancel">
      <el-form ref="roleForm" label-width="120px" :model="roleForm" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, updateRole, addRole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      list: [],
      formDate: {},
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '角色名称不能为空' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    // 改变页码
    changePage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    // 获取公司信息
    async getCompanyInfo() {
      this.formDate = await getCompanyInfo(this.companyId)
    },
    // 删除角色
    async deleteRole(value) {
      try {
        await this.$confirm('确认删除该角色吗？')
        await deleteRole(value.id)
        this.getRoleList()
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 编辑角色
    async editRole(value) {
      // 获取角色信息,填充到弹层表单中
      this.roleForm = await getRoleDetail(value.id)
      this.showDialog = true
    },
    // 点击 X 和取消，包括弹层关闭的 close 事件
    btnCancel() {
      this.showDialog = false
      // 清空表单内容
      this.roleForm = {
        name: '',
        description: ''
      }
      // 移除校验结果
      this.$refs.roleForm.resetFields()
    },
    async btnOK() {
      try {
        await this.$refs.roleForm.validate()
        // 如果 roleForm 如果有 ID，则处于编辑状态，否则为新增
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        this.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    }

  }

}
</script>

<style>

</style>

