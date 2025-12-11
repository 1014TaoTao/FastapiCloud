<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getUserById } from '../../../api/user'
import type { UserTable } from '../../../api/user'

const router = useRouter()
const route = useRoute()
const userId = computed(() => route.params.id as string)

const user = ref<UserTable | null>(null)
const loading = ref(false)

// 加载用户详情
const loadUserDetail = async () => {
  loading.value = true
  try {
    const response = await getUserById(Number(userId.value))
    user.value = response.data
  } catch (error) {
    ElMessage.error('加载用户详情失败')
    console.error('Load user detail error:', error)
    router.push('/users')
  } finally {
    loading.value = false
  }
}

// 返回用户列表
const handleBack = () => {
  router.push('/users')
}

// 跳转到编辑页面
const handleEdit = () => {
  router.push(`/users/${userId.value}/edit`)
}

// 组件挂载时加载用户详情
onMounted(() => {
  loadUserDetail()
})
</script>

<template>
  <div class="user-detail-container">
    <h2 class="page-title">用户详情</h2>
    
    <el-card v-loading="loading" class="user-detail-card">
      <template #header>
        <div class="card-header">
          <span>{{ user?.username }} - {{ user?.name }}</span>
          <div class="header-buttons">
            <el-button type="primary" size="small" @click="handleEdit">编辑</el-button>
            <el-button size="small" @click="handleBack">返回</el-button>
          </div>
        </div>
      </template>
      
      <div class="detail-content">
        <div class="detail-row">
          <div class="detail-label">ID:</div>
          <div class="detail-value">{{ user?.id }}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">用户名:</div>
          <div class="detail-value">{{ user?.username }}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">昵称:</div>
          <div class="detail-value">{{ user?.name }}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">状态:</div>
          <div class="detail-value">
            <el-tag type="success" v-if="user?.status">✅ 激活</el-tag>
            <el-tag type="danger" v-else>❌ 未激活</el-tag>
          </div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">超级管理员:</div>
          <div class="detail-value">
            <el-tag type="info" v-if="user?.is_superuser">✅ 是</el-tag>
            <el-tag type="warning" v-else>❌ 否</el-tag>
          </div>
        </div>
        

        
        <div class="detail-row">
          <div class="detail-label">备注:</div>
          <div class="detail-value">{{ user?.description || '无' }}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">创建时间:</div>
          <div class="detail-value">{{ user?.created_time }}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">更新时间:</div>
          <div class="detail-value">{{ user?.updated_time }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.user-detail-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  margin-bottom: 20px;
  color: #333;
}

.user-detail-card {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-buttons {
  display: flex;
  gap: 10px;
}

.detail-content {
  margin-top: 20px;
}

.detail-row {
  display: flex;
  margin-bottom: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-label {
  width: 120px;
  font-weight: bold;
  color: #606266;
}

.detail-value {
  flex: 1;
  color: #303133;
}
</style>