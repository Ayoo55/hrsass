<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <el-button slot="after" type="primary" size="small" @click="addPermission(1,0)">添加权限</el-button>
      </PageTools>
      <el-table border :data="list" row-key="id">
        <el-table-column align="center" label="菜单名称" prop="name" />
        <el-table-column align="center" label="权限标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button v-if="row.type===1" type="text" @click="addPermission(2,row.id)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>

        </el-table-column>

      </el-table>
    </div>
    <el-dialog :visible="showDialog" :title="showText" @close="btnCancel">
      <el-form ref="permForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" />
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="formData.description" />
        </el-form-item>
        <el-form-item label="开启" prop="enVisible">
          <el-switch v-model="formData.enVisible" active-value="1" inactive-value="0" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>

  </div>
</template>

<script>
import { getPermissionList, delPermission, addPermission, getPermissionDetail, updatePermission } from '@/api/permisson'
import { tranListToTreeData } from '@/utils/index'
export default {
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑权限' : '新增权限'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取权限
    async getPermissionList() {
      this.list = tranListToTreeData(await getPermissionList(), '0')
    },
    // 添加/编辑权限
    async btnOK() {
      await this.$refs.permForm.validate()
      if (this.formData.id) {
        // 编辑状态
        await updatePermission(this.formData)
      } else {
        await addPermission(this.formData)
      }
      this.getPermissionList()
      this.$message.success('添加权限成功')
      this.showDialog = false
    },
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.permForm.resetFields()
      this.showDialog = false
    },
    // 删除权限
    async delPermission(id) {
      try {
        await this.$confirm('确认删除此权限吗？')
        await delPermission(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 添加权限
    // 区分添加权限的位置，储存到 fromdate 中，因为后面添加权限需要上传 type pid 两个属性，所以可以根据此时保存到值进行上传
    addPermission(type, pid) {
      // type 表示是一级访问权还是二级操作权
      // pid 表示当前数据的父节点的标识
      this.formData.pid = pid
      this.formData.type = type
      this.showDialog = true
    },
    // 编辑权限
    async editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    }
  }
}
</script>

<style>

</style>

