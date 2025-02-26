import { Component } from '@angular/core';
import { ProfileComponent } from "../profile/profile.component";
import { FoodComponent } from '../food/food.component';

@Component({
  selector: 'app-dashboard',
  imports: [ProfileComponent, FoodComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
