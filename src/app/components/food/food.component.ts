import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FoodService } from '../../services/food.service';
import { DatePipe, JsonPipe } from '@angular/common';

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
  groupedFoodList: any[] = [];

  constructor() {
    this.foodForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required]
    });
    this.loadFoodList();
  }

  onAddFood(): void {
    if (this.foodForm.valid) {
      this.foodService.addFood(this.foodForm.value).subscribe({
        next: (response) => {
          this.foodList.push(response);
          this.groupedFoodList = this.groupByDate(this.foodList, "date");
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
        this.groupedFoodList = this.groupByDate(this.foodList, "date");
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
        console.log('Food list:', this.foodList);
        this.groupedFoodList = this.groupByDate(this.foodList, "date");
        console.log('Grouped food list:', this.groupedFoodList);
      },
      error: (error) => {
        console.error('Error loading food list:', error);
      }
    });
  }


  groupByDate(arr: any[], property: string): { date: string, food: any[] }[] {
    const grouped = arr.reduce((acc, item) => {
      const date = new Date(item[property]).toDateString(); // Convert date to a readable format
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    // Transform the grouped object into an array of objects
    return Object.keys(grouped).map(date => ({
      date: date,
      food: grouped[date]
    }));
  }
}
