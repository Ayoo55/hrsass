<template>
  <div>
    <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
      <el-form ref="addEmployee" label-width="120px" :data="list" :model="formData" :rules="rules">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入姓名" style="width:50%" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机" style="width:50%" />
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker v-model="formData.timeOfEntry" placeholder="请输入入职时间" style="width:50%" />
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
            <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.id" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="formData.workNumber" placeholder="请输入工号" style="width:50%" />
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input v-model="formData.departmentName" placeholder="请输入部门" style="width:50%" @focus="getDepartments" />
          <el-tree v-if="showTree" v-loading="loading" default-expand-all="true" :data="treeData" :props="{label:'name'}" @node-click="selectNode" />
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker v-model="formData.correctionTime" placeholder="请输入转正时间" style="width:50%" />
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button type="primary" size="small" @click="btnOK">确定</el-button>
          </el-col>
        </el-row>
      </template>

    </el-dialog>
  </div>
</template>

<script>
import { tranListToTreeData } from '@/utils'
import { getDepartments } from '@/api/departments'
import EmployeeEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
export default {

  name: 'AddEmployee',

  components: {},

  props: {
    showDialog: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      EmployeeEnum,
      list: [],
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]

      },
      treeData: [],
      showTree: false,
      loading: false

    }
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    async getDepartments() {
      this.loading = true
      this.showTree = true
      const { depts } = await getDepartments()
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    },
    selectNode(node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },
    btnCancel() {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addEmployee.resetFields()
      this.$emit('update:showDialog', false)
    },
    async btnOK() {
      try {
        // 手动校验表单
        await this.$refs.addEmployee.validate()
        await addEmployee(this.formData)
        this.$parent.getEmployeeList()
        this.$parent.showDialog = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang='less' scoped>

</style>
