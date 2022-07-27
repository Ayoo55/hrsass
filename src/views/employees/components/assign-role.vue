<template>
  <div>
    <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
      <el-checkbox-group v-model="roleIds">
        <!-- 多选框 -->
        <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {

  name: '',

  components: {},

  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      default: null,
      type: String
    }
  },

  data() {
    return {
      list: [], // 所有角色列表
      roleIds: [] // 当前人员拥有的角色
    }
  },

  computed: {},

  watch: {},

  created() {
    this.getRoleList()
  },

  methods: {
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      this.list = rows
    },
    // 获取某个用户的基本信息
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },
    // 给员工分配角色
    async btnOK() {
      await assignRoles({
        id: this.userId,
        roleIds: this.roleIds
      })
      this.$emit('update:showRoleDialog', false)
    },
    // 取消
    btnCancel() {
      this.roleIds = []
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>
<style lang='less' scoped>

</style>
