import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  textcolor = "text-black"

  toggleColor(){
    if(this.textcolor ==  "text-black"){
      this.textcolor = "text-indigo-100"
    }
    else{
      this.textcolor = "text-black"
    }
  }
}
