import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // 这里添加你的认证逻辑
  const isAuthenticated = false; // 示例：从服务中获取认证状态
  
  if (!isAuthenticated) {
    router.navigate(['/welcome']);
    return false;
  }
  
  return true;
};

