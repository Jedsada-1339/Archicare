import { Component, OnInit } from '@angular/core';
import { HouseService, HouseDetail } from '../../house.service';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  houses: HouseDetail[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
    this.loadHouses();
  }

  loadHouses(): void {
    this.isLoading = true;
    this.error = null;
    
    this.houseService.getHouses().subscribe({
      next: (data) => {
        this.houses = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading houses:', err);
        this.error = 'Failed to load houses. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}