import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-card',
  standalone: false,
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent {
  @Input() title:string = "Welcome to your first House";

}
