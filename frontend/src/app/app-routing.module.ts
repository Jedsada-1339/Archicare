import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { AllHouseComponent } from './all-house/all-house.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'blog',
    component: BlogComponent
  },
  {
    path:'allhouse',
    component: AllHouseComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
