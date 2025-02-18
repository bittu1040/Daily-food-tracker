import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  fb= inject(FormBuilder);
  authService= inject(AuthService);
  router = inject(Router);
  toastr = inject(ToastrService);
  errorMessage: string="";



  constructor() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.authService.register(user).subscribe({
        next: (response) => {
          this.toastr.success('Registration successful');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = 'Registration failed. Please try again.';
          this.toastr.error(error.error.message);
        }
      });
    }
  }
}
