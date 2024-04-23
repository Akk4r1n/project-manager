import type { HttpInterceptorFn } from '@angular/common/http';

export const cookieInterceptor: HttpInterceptorFn = (req, next) => {
  return next(
    req.clone({
      withCredentials: true,
    })
  );
};
