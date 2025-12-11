<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserList, deleteUser } from '../../api/user'
import type { UserTable, UserQuery } from '../../api/user'
import SearchComponent from './components/search.vue'

const router = useRouter()
const users = ref<UserTable[]>([])
const loading = ref(false)
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 查询参数
const query = ref<UserQuery>({
  page: currentPage.value,
  size: pageSize.value
})

// 加载用户列表
const loadUsers = async () => {
  loading.value = true
  try {
    query.value.page = currentPage.value
    query.value.size = pageSize.value
    const response = await getUserList(query.value)
    users.value = response.data.items
    total.value = response.data.total
  } catch (error) {
    ElMessage.error('加载用户列表失败')
    console.error('Load users error:', error)
  } finally {
    loading.value = false
  }
}

// 分页变更
const handlePageChange = (page: number, size: number) => {
  currentPage.value = page
  pageSize.value = size
  loadUsers()
}

// 搜索用户
const handleSearch = () => {
  currentPage.value = 1
  loadUsers()
}

// 重置搜索
const handleReset = () => {
  currentPage.value = 1
  loadUsers()
}

// 跳转到创建用户页面
const handleCreate = () => {
  router.push('/users/create')
}

// 跳转到编辑用户页面
const handleEdit = (user: UserTable) => {
  router.push(`/users/${user.id}/edit`)
}

// 跳转到用户详情页面
const handleDetail = (user: UserTable) => {
  router.push(`/users/${user.id}`)
}

// 删除用户
const handleDelete = async (user: UserTable) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除用户 ${user.username} 吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    await deleteUser(user.id)
    ElMessage.success('删除成功')
    loadUsers()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
      console.error('Delete user error:', error)
    }
  }
}

// 组件挂载时加载用户列表
onMounted(() => {
  loadUsers()
})
</script>

<template>
  <div class="user-list-container">
    <div class="page-header">
      <img src="@/assets/fastapi-logo.svg" alt="FastAPI Logo" class="header-logo">
      <h2 class="page-title">用户列表</h2>
    </div>
    
    <!-- 搜索和操作栏 -->
    <div class="search-bar-container">
      <SearchComponent 
        v-model="query" 
        @search="handleSearch" 
        @reset="handleReset"
      />
      <div class="action-bar">
        <el-button type="primary" @click="handleCreate">创建用户</el-button>
      </div>
    </div>
    
    <!-- 用户列表 -->
    <el-table 
      v-loading="loading" 
      :data="users" 
      stripe 
      border 
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="name" label="昵称" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status">
            ✅ 激活
          </el-tag>
          <el-tag type="danger" v-else>
            ❌ 未激活
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_time" label="创建时间" width="180" />
      <el-table-column prop="updated_time" label="更新时间" width="180" />
      <el-table-column label="操作" width="240">
        <template #default="scope">
          <el-button size="small" @click="handleDetail(scope.row)">详情</el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handlePageChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped>
/* 状态标签中的图标样式 */
.el-tag {
  display: flex;
  align-items: center;
  gap: 4px;
}
.user-list-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

/* 背景装饰元素 */
.user-list-container::before {
  content: '';
  position: absolute;
  top: -10%;
  right: -5%;
  width: 300px;
  height: 300px;
  opacity: 0.02;
  pointer-events: none;
  z-index: 0;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  position: relative;
  z-index: 1;
}

.header-logo {
  height: 40px;
  width: auto;
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.page-title {
  margin: 0;
  color: #333;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #409eff, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.search-bar-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 20px;
}

.action-bar {
  display: flex;
  align-items: center;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>