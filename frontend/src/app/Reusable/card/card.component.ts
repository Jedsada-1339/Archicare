import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  houseDetails = {
    title: 'Two-storey modern house',
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
    tag: {
      onestoryhouse: false, 
      twostoryhouse: true, 
      apartment: false, 
      townhouse: false
    }
  };
}
