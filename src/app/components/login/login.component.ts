import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  loading = false;
  loadingService = inject(LoadingService);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  onLogin(): void {
    if (this.loginForm.valid) {
      // this.loading = true;
      this.loadingService.show();
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe(
        {
          next: (response) => {
            // this.loading = false;
            this.loadingService.hide();
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.loadingService.hide();
            // this.loading = false;
            console.log(error);
          }
        }
      );
    }
  }

}
