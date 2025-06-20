import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService, HouseDetail } from '../house.service';

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
  
  // Loading and error states
  isLoading = true;
  error: string | null = null;
  
  // House data
  houseDetails: HouseDetail | null = null;
  houseImages: { src: string }[] = [];
  recommendedHouses: HouseDetail[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private houseService: HouseService
  ) {}

  ngOnInit(): void {
    // Get house ID from route parameter
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convert to number
      if (id) {
        this.loadHouseDetail(id);
      } else {
        this.error = 'Invalid house ID';
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  loadHouseDetail(id: number): void {
    this.isLoading = true;
    this.error = null;

    this.houseService.getHouseById(id).subscribe({
      next: (house) => {
        this.houseDetails = house;
        this.setupImages();
        this.loadRecommendedHouses(id);
        this.isLoading = false;
        this.startAutoSlide();
      },
      error: (err) => {
        console.error('Error loading house detail:', err);
        this.error = err.status === 404 
          ? 'House not found' 
          : 'Failed to load house details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  setupImages(): void {
    if (this.houseDetails?.imageUrls && this.houseDetails.imageUrls.length > 0) {
      this.houseImages = this.houseDetails.imageUrls.map(url => ({ src: url }));
    } else {
      // Fallback images if no images from API
      this.houseImages = [
        { src: 'img/house/Ex-house1.jpg' }
      ];
    }
  }

  loadRecommendedHouses(excludeId: number): void {
    this.houseService.getRecommendedHouses(excludeId).subscribe({
      next: (houses) => {
        this.recommendedHouses = houses.slice(0, 3); // Take first 3 for recommendation
      },
      error: (err) => {
        console.error('Error loading recommended houses:', err);
        // Don't show error for recommended houses, just log it
      }
    });
  }

  // Navigation methods
  goBack(): void {
    window.history.back();
  }

  goToHouse(houseId: number): void {
    this.router.navigate(['/house-detail', houseId]);
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
    if (this.houseImages.length > 1) {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000); // Change slide every 5 seconds
    }
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