import { Component } from '@angular/core';

@Component({
  selector: 'app-post-page',
  standalone: false,
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css'
})
export class PostPageComponent {
  onSelectedHouse: string = "text-indigo-600 shadow bg-white"
  onSelectedBlog: string = ""

  onFormHouse: boolean = true
  onFormBlog: boolean = false

  roomOptions = ['Living Room', 'Kitchen', 'Balcony / Storage Area', 'Bathroom'];

  allCategory = ['One-storyhouse','Two-story house','Apartment','Townhouse'];

  togglePostHouse() {
    this.onSelectedHouse = "text-indigo-600 shadow bg-white"
    this.onSelectedBlog = ""

    this.onFormHouse = true
    this.onFormBlog = false

  }

  togglePostBlog() {
    this.onSelectedHouse = ""
    this.onSelectedBlog = "text-indigo-600 shadow bg-white"

    this.onFormHouse = false
    this.onFormBlog = true
  }

}
