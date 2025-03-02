import { Component } from '@angular/core';
import { ProfileComponent } from "../profile/profile.component";
import { FoodComponent } from '../food/food.component';
import { DailyFoodTargetComponent } from "../daily-food-target/daily-food-target.component";

@Component({
  selector: 'app-dashboard',
  imports: [ProfileComponent, FoodComponent, DailyFoodTargetComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
