import { Component } from '@angular/core';

@Component({
  selector: 'app-rate',
  standalone: false,
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.css'
})
export class RateComponent {
  maxStars = 5;
  currentRating = 0;
  hoverRating = 0;

  // เมื่อเมาส์ hover ดาว
  onHover(index: number) {
    this.hoverRating = index;
  }

  // เมื่อออกจากดาว
  onLeave() {
    this.hoverRating = 0;
  }

  // เมื่อคลิกให้ดาว
  rate(index: number) {
    this.currentRating = index;
  }

  // เช็คว่าจะให้ดาวเต็มหรือเปล่า
  isFilled(index: number): boolean {
    return index <= (this.hoverRating || this.currentRating);
  }
}
