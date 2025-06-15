import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router) {}

  onSignIn: boolean = true;
  onSignUp: boolean = false;

  signup(): void {
    this.onSignUp = true;
    this.onSignIn = false;
  }

  signin(): void {
    this.onSignIn = true;
    this.onSignUp = false;
  }

  // Form สำหรับ Sign In
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  // Form สำหรับ Sign Up - เพิ่ม validation ให้ตรงกับ DTO
  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    ])
  });

  onSubmit(): void {
    if (this.form.valid) {
      const data = this.form.getRawValue();
      console.log('Sending signin data:', data);

      this.http.post('http://localhost:3000/api/auth/signin', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .subscribe({
        next: (res: any) => {
          console.log('Signin success:', res);
          
          // เก็บ JWT token ใน localStorage (แก้ชื่อ property ให้ตรงกับ backend)
          if (res.accessToken) {
            localStorage.setItem('token', res.accessToken);
          }
          
          // เก็บข้อมูล user ด้วย (ถ้ามี)
          if (res.user) {
            localStorage.setItem('user', JSON.stringify(res.user));
          }
          
          alert('Signin successful!');
          
          // Redirect ไปหน้า dashboard
          this.router.navigate(['']);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Signin failed:', err);
          
          let errorMessage = 'Signin failed';
          if (err.error && err.error.message) {
            if (Array.isArray(err.error.message)) {
              errorMessage = err.error.message.join(', ');
            } else {
              errorMessage = err.error.message;
            }
          } else if (err.message) {
            errorMessage = err.message;
          }
          
          alert(errorMessage);
        }
      });
    } else {
      // แสดง validation errors
      const errors = [];
      if (this.form.get('username')?.errors) {
        errors.push('Username is required');
      }
      if (this.form.get('password')?.errors) {
        errors.push('Password is required');
      }
      alert('Please fix the following errors:\n' + errors.join('\n'));
    }
  }

  onSignupSubmit(): void {
    if (this.signupForm.valid) {
      const data = this.signupForm.getRawValue();
      console.log('Sending signup data:', data);

      // เปลี่ยน URL ให้ตรงกับ NestJS route
      this.http.post('http://localhost:3000/api/users/signup', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .subscribe({
        next: (res) => {
          console.log('Signup success:', res);
          alert('Signup successful! Please sign in.');
          this.signin(); // เปลี่ยนไปหน้า sign in
        },
        error: (err: HttpErrorResponse) => {
          console.error('Signup failed:', err);
          
          // จัดการ error message ให้ดีขึ้น
          let errorMessage = 'Signup failed';
          if (err.error && err.error.message) {
            if (Array.isArray(err.error.message)) {
              errorMessage = err.error.message.join(', ');
            } else {
              errorMessage = err.error.message;
            }
          } else if (err.message) {
            errorMessage = err.message;
          }
          
          alert(errorMessage);
        }
      });
    } else {
      // แสดง validation errors
      const errors = [];
      if (this.signupForm.get('username')?.errors) {
        errors.push('Username is required');
      }
      if (this.signupForm.get('password')?.errors) {
        const passwordErrors = this.signupForm.get('password')?.errors;
        if (passwordErrors?.['required']) {
          errors.push('Password is required');
        } else if (passwordErrors?.['pattern']) {
          errors.push('Password must be minimum eight characters, at least one letter and one number');
        }
      }
      alert('Please fix the following errors:\n' + errors.join('\n'));
    }
  }
}