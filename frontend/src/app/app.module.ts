import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './Reusable/card/card.component';
import { BlogCardComponent } from './Reusable/blog-card/blog-card.component';
import { RateComponent } from './Reusable/rate/rate.component';
import { FooterComponent } from './footer/footer.component';
import { AllHouseComponent } from './all-house/all-house.component';
import { FilterButtonComponent } from './Reusable/filter-button/filter-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogComponent,
    HeaderComponent,
    CardComponent,
    BlogCardComponent,
    RateComponent,
    FooterComponent,
    AllHouseComponent,
    FilterButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
