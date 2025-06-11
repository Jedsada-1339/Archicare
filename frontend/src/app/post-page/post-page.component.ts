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

  allCategory = ['One-storyhouse', 'Two-story house', 'Apartment', 'Townhouse'];

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

  // MultipleFilesSelected
  imagePreviews: string[] = [];

  onMultipleFilesSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.imagePreviews.push(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
  }

  // SingleFilesSelected
  singleImagePreview: string | ArrayBuffer | null = null;

  onSingleFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.singleImagePreview = reader.result;
    };
    reader.readAsDataURL(file); // Convert to base64
  }


}
