import { Component } from '@angular/core';

@Component({
  selector: 'app-rate',
  standalone: false,
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.css'
})
export class RateComponent {
  likes = 342;
  dislikes = 12;
  liked = false;
  disliked = false;

  toggleLike() {
    if (this.liked) {
      this.likes--;
    } else {
      this.likes++;
      if (this.disliked) {
        this.disliked = false;
        this.dislikes--;
      }
    }
    this.liked = !this.liked;
  }

  toggleDislike() {
    if (this.disliked) {
      this.dislikes--;
    } else {
      this.dislikes++;
      if (this.liked) {
        this.liked = false;
        this.likes--;
      }
    }
    this.disliked = !this.disliked;
  }
}
