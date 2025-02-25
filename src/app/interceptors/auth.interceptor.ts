import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('authToken');
  const router = inject(Router);
  const toastr = inject(ToastrService);

  console.log('authToken', authToken);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token is invalid or expired, redirect to login
        localStorage.removeItem('authToken');
        toastr.error('Session expired, please login again');
        router.navigate(['/login']);
      }
      return throwError(error);
    })
  );
};
