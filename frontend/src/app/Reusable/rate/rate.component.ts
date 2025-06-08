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
  showLikeNotification = false;
  showDislikeNotification = false;

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
    
    // Show like notification
    this.showLikeNotification = true;
    this.showDislikeNotification = false;
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      this.showLikeNotification = false;
    }, 1500);
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
    
    // Show dislike notification
    this.showDislikeNotification = true;
    this.showLikeNotification = false;
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      this.showDislikeNotification = false;
    }, 1500);
  }
}