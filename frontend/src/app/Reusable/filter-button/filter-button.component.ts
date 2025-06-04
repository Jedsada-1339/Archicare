import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-button',
  standalone: false,
  templateUrl: './filter-button.component.html',
  styleUrl: './filter-button.component.css'
})
export class FilterButtonComponent {
  show_modal="hidden"
  
  openmodal(){
    this.show_modal=""
  }
  closemodal(){
    this.show_modal="hidden"
  }
}
