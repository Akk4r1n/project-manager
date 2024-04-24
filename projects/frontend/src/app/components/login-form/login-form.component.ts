import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { validateEmail } from '../../validators/validators';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/api/users.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  formGroup: any;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, validateEmail]],
      password: ['', [Validators.required]],
    });
  }

  onLoginClicked() {
    this.usersService
      .login({
        email: this.formGroup.value.email,
        password_plain: this.formGroup.value.password,
      })
      .subscribe((res) => {
        this.router.navigateByUrl('/projects');
      });
  }
}
