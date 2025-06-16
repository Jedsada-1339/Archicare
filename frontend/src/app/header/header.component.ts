import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // เช็คสถานะการล็อกอินเมื่อ component load
    this.checkLoginStatus();
    
    // Listen for storage changes (เมื่อมีการล็อกอิน/ล็อกเอาท์จาก tab อื่น)
    window.addEventListener('storage', () => {
      this.checkLoginStatus();
    });
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      this.isLoggedIn = true;
      this.user = JSON.parse(userStr);
    } else {
      this.isLoggedIn = false;
      this.user = null;
    }
  }

  logout(): void {
    // ลบข้อมูลจาก localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // อัพเดทสถานะ
    this.isLoggedIn = false;
    this.user = null;
    
    // Redirect ไปหน้าหลัก
    this.router.navigate(['/']);
    
    alert('Logged out successfully!');
  }
}