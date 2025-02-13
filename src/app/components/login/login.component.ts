import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  password: string | undefined;
  username: string | undefined;

  onSubmit() {  
    console.log('Username: ' + this.username);
    console.log('Password: ' + this.password);
  }
}
