export const isDev = 1
export const BASE_NAME = isDev ? '/' : '/';

// TODO 个环境host配置
export const apiHost = isDev
  ? 'http://localhost:3001'
  : 'http://localhost:3001';