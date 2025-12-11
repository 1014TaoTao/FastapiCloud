import apiClient from '../utils/request';
import type { BaseResponse, LoginRequest, LoginResponse, PageResponse } from '../utils/types';

// 用户类型定义
export interface UserTable {
  id: number;
  username: string;
  name: string;
  status: boolean;
  description?: string | null;
  is_superuser: boolean;
  created_time: string;
  updated_time: string;
}


// 用户创建/更新请求类型定义
export interface UserForm {
  username: string;
  password: string;
  name: string;
  status: boolean;
  description?: string | null;
}


// 用户查询参数类型定义
export interface UserQuery {
  page?: number;
  size?: number;
  username?: string;
  name?: string;
}


// 用户创建/更新请求类型定义（额外别名，兼容不同命名）
export type UserCreate = UserForm;
export type UserUpdate = UserForm;

// 重新导出类型
export type { LoginRequest, LoginResponse, BaseResponse, PageResponse } from '../utils/types';


// 用户登录
export const login = async (params: LoginRequest): Promise<BaseResponse<LoginResponse>> => {
  try {
    const data = await apiClient.post('/login', new URLSearchParams({
      username: params.username,
      password: params.password,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    // 保存token到localStorage
    if (data.data && data.data.access_token) {
      localStorage.setItem('token', data.data.access_token);
    }
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// 用户注销
export const logout = async (): Promise<BaseResponse> => {
  try {
    const data = await apiClient.post('/logout');
    // 清除localStorage中的token
    localStorage.removeItem('token');
    return data;
  } catch (error) {
    console.error('Logout failed:', error);
    // 即使API调用失败，也清除本地token
    localStorage.removeItem('token');
    throw error;
  }
};

// 获取用户列表
export const getUserList = async (params?: UserQuery): Promise<BaseResponse<PageResponse<UserTable>>> => {
  try {
    const data = await apiClient.get('/users', { params });
    return data;
  } catch (error) {
    console.error('Get user list failed:', error);
    throw error;
  }
};

// 创建用户
export const createUser = async (userData: UserForm): Promise<BaseResponse<UserTable>> => {
  try {
    const data = await apiClient.post('/user', userData);
    return data;
  } catch (error) {
    console.error('Create user failed:', error);
    throw error;
  }
};

// 获取用户详情
export const getUserDetail = async (userId: number): Promise<BaseResponse<UserTable>> => {
  try {
    const data = await apiClient.get(`/user/${userId}`);
    return data;
  } catch (error) {
    console.error('Get user detail failed:', error);
    throw error;
  }
};

// 为了兼容性，添加getUserById作为getUserDetail的别名
export const getUserById = getUserDetail;

// 更新用户
export const updateUser = async (userId: number, userData: UserForm): Promise<BaseResponse<UserTable>> => {
  try {
    const data = await apiClient.put(`/user/${userId}`, userData);
    return data;
  } catch (error) {
    console.error('Update user failed:', error);
    throw error;
  }
};

// 删除用户
export const deleteUser = async (userId: number): Promise<BaseResponse> => {
  try {
    const data = await apiClient.delete(`/user/${userId}`);
    return data;
  } catch (error) {
    console.error('Delete user failed:', error);
    throw error;
  }
};

// 检查用户是否已登录
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('token') !== null;
};

// 获取当前用户信息
export const getCurrentUser = async (): Promise<BaseResponse<UserTable | null>> => {
  // 在实际应用中，可能需要从token解析用户信息或从API获取
  const token = localStorage.getItem('token');
  if (token) {
    // 简单示例：从token中解析用户信息（实际应用中可能需要更复杂的解析）
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3 && tokenParts[1]) {
        const base64 = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
        );
        return { code: 0, msg: 'Success', data: JSON.parse(jsonPayload) as UserTable };
      }
      throw new Error('Invalid token format');
    } catch (error) {
      console.error('Parse token failed:', error);
      return { code: 1, msg: 'Parse token failed', data: null };
    }
  }
  return { code: 1, msg: 'No token found', data: null };
};


