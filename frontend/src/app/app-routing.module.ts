import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { AllHouseComponent } from './all-house/all-house.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'allhouse',
    component: AllHouseComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', 
      anchorScrolling: 'enabled',   //วิธีใช่ <h2 id="section1">This is Section 1</h2> เรียกใช่่โดย <a [routerLink]="['/blog']" fragment="section1">Go to Section 1</a>      
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
