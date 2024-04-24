import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { validateEmail, checkPasswords } from '../../validators/validators';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/api/users.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  formGroup: any;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group(
      {
        email: ['', [Validators.required, validateEmail]],
        name: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: checkPasswords }
    );
  }

  onRegisterClicked() {
    this.usersService
      .register({
        email: this.formGroup.value.email,
        name: this.formGroup.value.name,
        password_plain: this.formGroup.value.password,
      })
      .subscribe((res) => {
        this.usersService
          .login({
            email: this.formGroup.value.email,
            password_plain: this.formGroup.value.password,
          })
          .subscribe((res) => {
            this.router.navigateByUrl('/projects');
          });
      });
  }

  onGoogleRegisterClicked() {}

  onGithubRegisterClicked() {}
}
