import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-food',
  imports: [ReactiveFormsModule],
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss'
})
export class FoodComponent {

  private fb= inject(FormBuilder);
  private foodService= inject(FoodService);

  foodForm: FormGroup;
  foodList: any[] = [];

  constructor() {
    this.foodForm = this.fb.group({
      name: ['', Validators.required],
      calories: ['', Validators.required]
    });
    this.loadFoodList();
  }

  onAddFood(): void {
    if (this.foodForm.valid) {
      this.foodService.addFood(this.foodForm.value).subscribe({
        next: (response) => {
          this.foodList.push(response);
          this.foodForm.reset();
        },
        error: (error) => {
          console.error('Error adding food:', error);
        }
      });
    }
  }

  onDeleteFood(id: string): void {
    this.foodService.deleteFood(id).subscribe({
      next: (response) => {
        this.foodList = this.foodList.filter(food => food._id !== id);
      },
      error: (error) => {
        console.error('Error deleting food:', error);
      }
    });
  }

  loadFoodList(): void {
    this.foodService.listAllFood().subscribe({
      next: (response) => {
        this.foodList = response;
      },
      error: (error) => {
        console.error('Error loading food list:', error);
      }
    });
  }
}
