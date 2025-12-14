<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login } from '../../api/user'
import type { LoginRequest } from '../../api/user'

const router = useRouter()
const form = reactive<LoginRequest>({
  username: '',
  password: ''
})
const loading = ref(false)

// 处理表单提交
const handleSubmit = async () => {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }

  loading.value = true
  try {
    await login(form)
    ElMessage.success('登录成功')
    router.push('/users')
  } catch (error) {
    ElMessage.error('登录失败，请检查用户名和密码')
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <!-- 背景装饰元素 -->
    <div class="background-decoration">
      <img src="@/assets/vue.svg" alt="Vue Logo" class="decoration-icon vue-icon">
      <img src="@/assets/fastapi-logo.svg" alt="FastAPI Logo" class="decoration-icon fastapi-icon">
    </div>
    
    <div class="login-form-wrapper">
      <div class="login-header">
      <img src="@/assets/fastapi-logo.svg" alt="FastAPI Logo" class="login-logo">
      <h2 class="login-title">用户登录</h2>
    </div>
      <el-form :model="form" label-width="80px" class="login-form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="loading" class="login-button">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
  position: relative;
  overflow: hidden;
}

/* 背景装饰元素 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.decoration-icon {
  position: absolute;
  opacity: 0.05;
  animation: float 8s ease-in-out infinite;
}

.vue-icon {
  top: 15%;
  left: 15%;
  width: 180px;
  height: auto;
  animation-delay: 0s;
}

.fastapi-icon {
  bottom: 15%;
  right: 15%;
  width: 220px;
  height: auto;
  animation-delay: 3s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(5deg);
  }
}

.login-form-wrapper {
  width: 420px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-form-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.login-logo {
  height: 70px;
  width: auto;
  margin-bottom: 20px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.login-title {
  text-align: center;
  margin: 0;
  color: #333;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #409eff, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-form {
  width: 100%;
}

.login-button {
  width: 100%;
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-form-wrapper {
    width: 90%;
    margin: 0 5%;
    padding: 30px;
  }
  
  .login-logo {
    height: 60px;
  }
  
  .decoration-icon {
    opacity: 0.03;
  }
  
  .vue-icon {
    width: 120px;
  }
  
  .fastapi-icon {
    width: 150px;
  }
}

@media (max-width: 480px) {
  .login-form-wrapper {
    padding: 25px;
  }
  
  .login-logo {
    height: 50px;
  }
  
  .login-title {
    font-size: 1.5rem;
  }
  
  .vue-icon {
    width: 80px;
  }
  
  .fastapi-icon {
    width: 100px;
  }
}
</style>