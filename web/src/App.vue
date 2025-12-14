<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const isAuthenticated = ref(!!localStorage.getItem('token'))

// 处理登录
const handleLogin = () => {
  router.push('/login')
}

// 处理注销
const handleLogout = () => {
  localStorage.removeItem('token')
  isAuthenticated.value = false
  ElMessage.success('注销成功')
  router.push('/')
}
</script>

<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="app-header">
      <div class="header-left">
        <div class="logo-container">
        <img src="./assets/fastapi-logo.svg" alt="FastAPI Logo" class="app-logo">
      </div>
        <h1>用户管理系统</h1>
      </div>
      <div class="header-right">
        <template v-if="isAuthenticated">
          <el-button type="primary" @click="router.push('/users')">用户管理</el-button>
          <el-button @click="handleLogout">注销</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </template>
      </div>
    </header>

    <!-- 主内容区域 -->
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.app-logo {
  height: 32px;
  width: auto;
}

.header-left h1 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.header-right {
  display: flex;
  gap: 10px;
}

.app-main {
  flex: 1;
  padding: 20px;
  background-color: #f5f7fa;
}
</style>
