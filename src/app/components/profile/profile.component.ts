import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [JsonPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  dataService= inject(DataService);
  profileData: any;

  constructor() { }

  ngOnInit() {
    this.dataService.getProfile().subscribe((data: any) => {
      this.profileData = data;
    });
  }

}
