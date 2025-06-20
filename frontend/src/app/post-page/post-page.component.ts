import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-post-page',
  standalone: false,
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css'
})
export class PostPageComponent implements OnInit {
  isDisabled: boolean = false
  isSubmitting: boolean = false

  onSelectedHouse: string = "text-indigo-600 shadow bg-white"
  onSelectedBlog: string = ""

  onFormHouse: boolean = true
  onFormBlog: boolean = false

  private apiUrl = 'http://localhost:3000/api/houses';

  constructor(private http: HttpClient) {}

  tags = [
    { key: 'onestoryhouse', label: 'One-story house' },
    { key: 'twostoryhouse', label: 'Two-story house' },
    { key: 'apartment', label: 'Apartment' },
    { key: 'townhouse', label: 'Townhouse' },
  ];

  rooms = [
    { key: 'livingRoom', label: 'Living Room' },
    { key: 'kitchen', label: 'Kitchen' },
    { key: 'balcony', label: 'Balcony / Storage Area' },
  ];

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
  selectedFiles: File[] = [];

  onMultipleFilesSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (!files || files.length === 0) return;

    // Clear previous selections
    this.imagePreviews = [];
    this.selectedFiles = [];

    Array.from(files).forEach(file => {
      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.imagePreviews.push(reader.result.toString());
          console.log(this.selectedFiles)
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Get user from localStorage
  private getUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Get token from localStorage
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.selectedFiles.splice(index, 1);
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
    reader.readAsDataURL(file);
  }

  houseForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    usable: new FormControl(),
    terrace: new FormControl(),
    garden: new FormControl(),
    total: new FormControl(),
    bedroom: new FormControl(),
    bathroom: new FormControl(),
    content: new FormControl(),
    tag: new FormGroup({
      onestoryhouse: new FormControl(false),
      twostoryhouse: new FormControl(false),
      apartment: new FormControl(false),
      townhouse: new FormControl(false),
    }),
   rooms: new FormGroup({
      livingRoom: new FormControl(false),
      kitchen: new FormControl(false),
      balcony: new FormControl(false)
    }),
  });

  onTagChange(selectedKey: string) {
    const tagGroup = this.houseForm.get('tag') as FormGroup;

    Object.keys(tagGroup.controls).forEach(key => {
      tagGroup.get(key)?.setValue(key === selectedKey);
    });
  }

  async onHouseSubmit() {
    if (this.houseForm.invalid) {
      alert('Please fill in all required fields');
      return;
    }

    const user = this.getUser();
    const token = this.getToken();

    if (!user || !token) {
      alert('Please login to post a house');
      return;
    }

    this.isSubmitting = true;

    try {
      const tagValues = this.houseForm.get('tag')?.value || {};
      const roomsValues = this.houseForm.get('rooms')?.value || {};

      // Prepare the data according to your DTO structure
      const createHouseDto = {
        title: this.houseForm.get('title')?.value || '',
        content: this.houseForm.get('content')?.value || '',
        bedrooms: this.houseForm.get('bedroom')?.value || 0,
        bathrooms: this.houseForm.get('bathroom')?.value || 0,
        area: {
          total: this.houseForm.get('total')?.value || 0,
          usable: this.houseForm.get('usable')?.value || 0,
          terrace: this.houseForm.get('terrace')?.value || 0,
          garden: this.houseForm.get('garden')?.value || 0
        },
        rooms: roomsValues,
        tag: tagValues,
        like: {
          likecount: 0,
          dislikecount: 0
        },
        imageUrls: this.imagePreviews
      };

      console.log('Sending data:', createHouseDto);
      console.log('User:', user);

      // Set headers with authorization
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      // Make the API call
      const response = await this.http.post(this.apiUrl, createHouseDto, { headers }).toPromise();

      console.log('House created successfully:', response);
      alert('House posted successfully!');

      // Reset form and clear images
      this.houseForm.reset();
      this.imagePreviews = [];
      this.selectedFiles = [];

    } catch (error: any) {
      console.error('Error creating house:', error);

      if (error.status === 401) {
        alert('Session expired. Please login again.');
      } else if (error.status === 400) {
        alert('Invalid data. Please check your inputs.');
        console.error('Error details:', error.error);
      } else {
        alert('Error posting house. Please try again.');
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  ngOnInit(): void {
    this.houseForm.valueChanges.subscribe(values => {
      const usable = Number(values.usable) || 0;
      const terrace = Number(values.terrace) || 0;
      const garden = Number(values.garden) || 0;

      const total = usable + terrace + garden;
      this.houseForm.get('total')?.setValue(total, { emitEvent: false });
    });
  }
}