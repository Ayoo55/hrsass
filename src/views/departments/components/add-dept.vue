<template>
  <div>
    <!-- 放置弹层组件 -->
    <el-dialog title="新增部门" :visible="showDialog">
      <!-- 表单数据 -->
      <el-form label-width="120px" :model="formDate" :rules="rules">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formDate.name" style="width:80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="formDate.code" style="width:80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-input v-model="formDate.manager" style="width:80%" placeholder="请选择" />
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="formDate.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
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
import { getDepartments } from '@/api/departments'
export default {

  name: 'AddDept',

  components: {},

  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },

  data() {
    // 验证部门同名，同级部门中禁止出现重复部门
    const checkNameRepeat = async(rule, value, callback) => {
      // 获取最新的部门列表
      const { depts } = await getDepartments()
      //   filter 得出当前部门的所有同级部门
      //  some 遍历所有当前同级部门的名字是否与 value 相同，有任意一个相同则返回true
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      //   isRepeat 如果为 true，则表明同名
      isRepeat ? callback(new Error((`同级部门下已经有${value}的部门了`))) : callback
    }
    // 验证部门编号，部门编码在整个模块中都不允许重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartments()
      const isRepeat = depts.some(item => item.code === value && value) // 这里加一个 value不为空 因为我们的部门有可能没有code
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    return {
      formDate: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '部门名称不能为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '部门名称要求1-50个字符',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: checkNameRepeat
          }
        ],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkCodeRepeat }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      }
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
