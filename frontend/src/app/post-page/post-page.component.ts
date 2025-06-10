import { Component } from '@angular/core';

@Component({
  selector: 'app-post-page',
  standalone: false,
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css'
})
export class PostPageComponent {
  onSelectedHouse :string = "text-indigo-600 shadow bg-white"
  onSelectedBlog :string = ""

  togglePostHouse(){
    this.onSelectedHouse = "text-indigo-600 shadow bg-white"
    this.onSelectedBlog = ""
  }

  togglePostBlog(){
    this.onSelectedHouse = ""
    this.onSelectedBlog = "text-indigo-600 shadow bg-white"
  }
}
