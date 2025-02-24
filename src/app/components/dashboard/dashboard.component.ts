import { Component } from '@angular/core';
import { ProfileComponent } from "../profile/profile.component";

@Component({
  selector: 'app-dashboard',
  imports: [ProfileComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
