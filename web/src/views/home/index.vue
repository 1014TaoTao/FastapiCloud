<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '../../api/user'

const router = useRouter()
const userIsAuthenticated = computed(() => isAuthenticated())
</script>

<template>
  <div class="home-container">
    <!-- 背景装饰元素 -->
    <div class="background-decoration">
      <img src="@/assets/vue.svg" alt="Vue Logo" class="decoration-icon vue-icon">
      <img src="@/assets/fastapi-logo.svg" alt="FastAPI Logo" class="decoration-icon fastapi-icon">
    </div>
    
    <div class="home-content">
      <div class="logo-banner">
        <img src="@/assets/fastapi-logo.svg" alt="FastAPI Logo" class="banner-logo">
        <h1>欢迎使用用户管理系统</h1>
      </div>
      <p class="home-description">
        这是一个基于 Vue 3 + TypeScript + Element Plus 开发的用户管理系统，
        提供用户的创建、查询、编辑和删除功能。
      </p>
      
      <div class="home-actions">
        <template v-if="userIsAuthenticated">
          <el-button type="primary" @click="router.push('/users')" size="large">
            进入用户管理
          </el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="router.push('/login')" size="large">
            请先登录
          </el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
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
  animation: float 6s ease-in-out infinite;
}

.vue-icon {
  top: 10%;
  left: 10%;
  width: 150px;
  height: auto;
  animation-delay: 0s;
}

.fastapi-icon {
  bottom: 10%;
  right: 10%;
  width: 200px;
  height: auto;
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.home-content {
  max-width: 700px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 50px 60px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.logo-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 25px;
}

.banner-logo {
  height: 60px;
  width: auto;
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

.home-content h1 {
  font-size: 2.8rem;
  margin: 0;
  color: #333;
  font-weight: 700;
  background: linear-gradient(135deg, #409eff, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home-description {
  font-size: 1.2rem;
  margin-bottom: 45px;
  color: #666;
  line-height: 1.7;
  padding: 0 20px;
}

.home-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-content {
    padding: 40px 30px;
    margin: 20px;
  }
  
  .logo-banner {
    flex-direction: column;
    gap: 15px;
  }
  
  .banner-logo {
    height: 50px;
  }
  
  .home-content h1 {
    font-size: 2.2rem;
  }
  
  .decoration-icon {
    opacity: 0.03;
  }
  
  .vue-icon {
    width: 100px;
  }
  
  .fastapi-icon {
    width: 120px;
  }
}

@media (max-width: 480px) {
  .home-content {
    padding: 30px 20px;
  }
  
  .banner-logo {
    height: 40px;
  }
  
  .home-content h1 {
    font-size: 1.8rem;
  }
  
  .home-description {
    font-size: 1rem;
    padding: 0;
  }
  
  .home-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>