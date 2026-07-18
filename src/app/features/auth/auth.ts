import { Auth } from './../../core/services/auth';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../core/services/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../shared/services/toast';

type AuthTab = 'signin' | 'signup';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthComponent {
    private readonly _authserv = inject(Auth);
    private readonly _router = inject(Router);
    private readonly toastservice = inject(ToastService);

  activeTab = signal<AuthTab>('signin');
  showPassword = signal(false);
  isLoading = signal(false);

  signInModel = { email: '', password: '', remember: false };
  signUpModel = {
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  registersub = new Subscription();
  login = new Subscription();


  registerform: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
    },
    { validators: [this.confirmpassword.bind(this)] }
  );

    loginform: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required, Validators.minLength(8),    ]),
  });



  switchTab(tab: AuthTab): void {
    this.activeTab.set(tab);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  onSignIn(): void {
        if (this.loginform.valid) {
      this.login.unsubscribe();
      this.isLoading.set(true);
      this.registersub = this._authserv.signin(this.loginform.value).subscribe({
        next: (res) => {
          console.log(res);
         localStorage.setItem("token" , res.accessToken)
         localStorage.setItem("user" , JSON.stringify(res.userId))
         this.toastservice.show("login successfully" , 'success')
         this.isLoading.set(false);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.toastservice.show(err.error.message , 'error')
          this.isLoading.set(false);
        },
        complete: () => {
          this._router.navigate(['/dash']);
          this.loginform.reset();
        },
      });
    } else {
      this.loginform.markAllAsTouched();
    }
  }

  onSignUp(): void {

       if (this.registerform.valid) {
        console.log(this.registerform.value);
        this.isLoading.set(true);
      this.registersub.unsubscribe();

      this.registersub = this._authserv.signup(this.registerform.value).subscribe({
        next: (res) => {
          console.log(res);
          this.toastservice.show('Account created successfully', 'success');
          this.switchTab("signin")
          this.isLoading.set(false);
          

        },
        error: (err: HttpErrorResponse) => {
     this.toastservice.show(err.message , 'error')
     this.isLoading.set(false);
        },
        complete: () => {
          this.registerform.reset();
        },
      });
    } else {
      this.registerform.markAllAsTouched();
    }
  }

    confirmpassword(formgroup: AbstractControl) {
    const password = formgroup.get('password')?.value;
    const rePassword = formgroup.get('rePassword')?.value;
    if (password !== rePassword && rePassword !== '') {
      formgroup.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }
}

