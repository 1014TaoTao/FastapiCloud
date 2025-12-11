<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { createUser, type UserCreate } from '../../../api/user'

const router = useRouter()

const form = reactive<UserCreate>({
  username: '',
  password: '',
  name: '',
  status: true,
  description: ''
})

const loading = ref(false)

// 验证表单
const validateForm = (): boolean => {
  if (!form.username) {
    ElMessage.warning('请输入用户名')
    return false
  }
  
  if (!form.name) {
    ElMessage.warning('请输入昵称')
    return false
  }
  
  if (!form.password) {
    ElMessage.warning('请输入密码')
    return false
  }
  
  return true
}

// 处理表单提交
const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  try {
    await createUser(form)
    ElMessage.success('用户创建成功')
    router.push('/users')
  } catch (error) {
    ElMessage.error('创建用户失败')
    console.error('Create user error:', error)
  } finally {
    loading.value = false
  }
}

// 取消操作
const handleCancel = () => {
  router.push('/users')
}
</script>

<template>
  <div class="user-form-container">
    <h2 class="page-title">创建用户</h2>
    
    <el-form 
      :model="form" 
      label-width="100px" 
      class="user-form"
    >
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      
      <el-form-item label="昵称">
        <el-input v-model="form.name" placeholder="请输入昵称" />
      </el-form-item>
      
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" />
      </el-form-item>
      
      <el-form-item label="是否激活">
        <el-switch v-model="form.status" />
      </el-form-item>
      
      <el-form-item label="备注">
        <el-input v-model="form.description" type="textarea" placeholder="请输入备注" rows="3" />
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :loading="loading">
          创建
        </el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.user-form-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  margin-bottom: 20px;
  color: #333;
}

.user-form {
  width: 100%;
}
</style>