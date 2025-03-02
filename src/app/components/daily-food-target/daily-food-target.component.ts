import { Component, inject } from '@angular/core';
import { FoodPreferencesService } from '../../services/food-preferences.service';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-daily-food-target',
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './daily-food-target.component.html',
  styleUrl: './daily-food-target.component.scss'
})
export class DailyFoodTargetComponent {

  isPanelOpen = false;
  newFood = { name: '', time: '' };
  foodPreferenceForm: FormGroup;

  foodList: any[] = [];

  fb = inject(FormBuilder);
  foodPreferencesService= inject(FoodPreferencesService);


  constructor() {
    this.foodPreferenceForm = this.fb.group({
      foodName: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadFoodPreferences();
  }

  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  loadFoodPreferences() {
    this.foodPreferencesService.getFoodPreferences().subscribe((foods) => {
      this.foodList = foods;
      console.log('Fetched food preferences:', this.foodList);
    });
  }

  onAddFood() {
    const foodName = this.foodPreferenceForm.get('foodName')!.value;
    this.foodPreferencesService.addFoodPreference(foodName).subscribe((food) => {
      console.log('Added food:', food);
      this.loadFoodPreferences();
      this.foodPreferenceForm.reset();});
  }

  removeFood(id: string) {
    this.foodPreferencesService.deleteFoodPreference(id).subscribe(() => {
      this.loadFoodPreferences();
    });
  }


}
