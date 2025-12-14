import axios from 'axios';
import type { BaseResponse } from './types.ts';

// 创建Axios实例
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // 后端服务地址
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 创建自定义ApiClient接口
export interface ApiClient {
  get<T = any>(url: string, config?: any): Promise<BaseResponse<T>>;
  post<T = any>(url: string, data?: any, config?: any): Promise<BaseResponse<T>>;
  put<T = any>(url: string, data?: any, config?: any): Promise<BaseResponse<T>>;
  delete<T = any>(url: string, config?: any): Promise<BaseResponse<T>>;
}

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 处理错误响应
    if (error.response) {
      // 服务器返回错误状态码
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // 请求已发送但没有收到响应
      console.error('Network Error:', error.request);
    } else {
      // 请求配置错误
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// 创建并导出符合ApiClient接口的apiClient实例
const apiClient: ApiClient = {
  get: (url, config) => axiosInstance.get(url, config) as Promise<BaseResponse<any>>,
  post: (url, data, config) => axiosInstance.post(url, data, config) as Promise<BaseResponse<any>>,
  put: (url, data, config) => axiosInstance.put(url, data, config) as Promise<BaseResponse<any>>,
  delete: (url, config) => axiosInstance.delete(url, config) as Promise<BaseResponse<any>>,
};

export default apiClient;
