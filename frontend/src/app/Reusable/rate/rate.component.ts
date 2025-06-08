// rate.component.ts
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
      // Cancel like - no notification
      this.likes--;
      this.liked = false;
    } else {
      // Activate like - show notification
      this.likes++;
      if (this.disliked) {
        this.disliked = false;
        this.dislikes--;
      }
      this.liked = true;
      
      // Show like notification only when activating
      this.showLikeNotification = true;
      this.showDislikeNotification = false;
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        this.showLikeNotification = false;
      }, 500);
    }
  }

  toggleDislike() {
    if (this.disliked) {
      // Cancel dislike - no notification
      this.dislikes--;
      this.disliked = false;
    } else {
      // Activate dislike - show notification
      this.dislikes++;
      if (this.liked) {
        this.liked = false;
        this.likes--;
      }
      this.disliked = true;
      
      // Show dislike notification only when activating
      this.showDislikeNotification = true;
      this.showLikeNotification = false;
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        this.showDislikeNotification = false;
      }, 500);
    }
  }
}