import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-house-detail',
  standalone: false,
  templateUrl: './house-detail.component.html',
  styleUrl: './house-detail.component.css'
})
export class HouseDetailComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  isModalOpen = false;
  modalImageIndex = 0;
  autoSlideInterval: any;

  // House images array
  houseImages = [
    {
      src: 'img/house/Ex-house1.jpg',
    },
    {
      src: 'img/house/Ex-house1.jpg',
    },
    {
      src: 'img/house/Ex-house1.jpg',
    },
    {
      src: 'img/house/Ex-house1.jpg',
    }
    
  ];

  houseDetails = {
    title: 'แปลนบ้านสำเร็จรูป A016',
    area: {
      total: 137,
      usable: 93,
      terrace: 6,
      garden: 34
    },
    rooms: {
      bedrooms: 3,
      bathrooms: 2,
      livingRoom: true,
      kitchen: true,
      terrace: true
    },
    specifications: {
      budget: 'งบไม่เกิน 1.5 ล้านบาท',
      land: '13.20 x 13.60 ม.'
    }
  };

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  // Carousel navigation methods
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.houseImages.length;
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 
      ? this.houseImages.length - 1 
      : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  // Auto-slide functionality
  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  // Modal functionality
  openModal(imageIndex: number): void {
    this.isModalOpen = true;
    this.modalImageIndex = imageIndex;
    this.stopAutoSlide(); // Stop auto-slide when modal is open
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeModal(): void {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto'; // Restore scrolling
    this.startAutoSlide(); // Resume auto-slide
  }

  // Modal navigation
  nextModalImage(): void {
    this.modalImageIndex = (this.modalImageIndex + 1) % this.houseImages.length;
  }

  prevModalImage(): void {
    this.modalImageIndex = this.modalImageIndex === 0 
      ? this.houseImages.length - 1 
      : this.modalImageIndex - 1;
  }

  // Handle keyboard navigation in modal
  onModalKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowLeft':
        this.prevModalImage();
        break;
      case 'ArrowRight':
        this.nextModalImage();
        break;
    }
  }

  // Handle carousel mouse events for auto-slide pause/resume
  onCarouselMouseEnter(): void {
    this.stopAutoSlide();
  }

  onCarouselMouseLeave(): void {
    if (!this.isModalOpen) {
      this.startAutoSlide();
    }
  }
}