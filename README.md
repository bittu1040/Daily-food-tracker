#  Daily Food Tracker

## Features

- **Food Logging:** Users can log meals with details like food name, serving size, calories, protein, carbs, and fats.
- **Dashboard Overview:** Displays daily/weekly calorie intake and macronutrient breakdown.
- **Search & Autocomplete:** Helps users find food items quickly.
- **User Profiles & Goals:** Users can set daily calorie and macronutrient goals.
- **History & Trends:** View past logs and trends over time.
- **Mobile-Friendly UI:** Designed with responsiveness in mind.
- **Quick Logging:** Users can quickly add frequent meals.
- **Validation & Feedback:** Inline validation for a smooth experience.
- **Progress Visualization:** Charts for nutrient breakdown.
- **Dark Mode:** Toggle between light and dark mode.

## Architecture and Best Practices

### Component-Based Structure

- **DashboardComponent:** Displays statistics and progress.
- **FoodLogComponent:** Form for adding and editing food logs.
- **FoodListComponent:** Shows the list of logged foods.
- **UserProfileComponent:** Manages user goals and preferences.
- **Shared Components:** Reusable UI components (modals, alerts, forms).

### Services

- **FoodService:** Manages food-related API calls.
- **UserService:** Handles user authentication and preferences.
- **NotificationService:** Provides in-app alerts and messages.

### State Management

- Uses **RxJS BehaviorSubject** for reactive data handling.
- Future scope: **NgRx or Akita** for complex state management.

## Installation & Setup

### Prerequisites

- **Node.js & npm** installed
- **Angular CLI** installed

### Steps

```sh
# Clone the repository
git clone https://github.com/your-repo/daily-food-tracker.git
cd daily-food-tracker

# Install dependencies
npm install

# Run the development server
ng serve
```

### Environment Configuration

Set up the environment file (`src/environments/environment.ts`):

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://your-api-url.com'
};
```

## Contributions & Future Enhancements

- **Implement Barcode Scanning:** Enable easy food tracking.
- **AI-Based Meal Recommendations:** Suggest meals based on user history.
- **Multi-User Support:** Add authentication for multiple users.
- **Custom Food Entries:** Allow users to add detailed nutritional data.

Feel free to contribute! Open issues and PRs are welcome. 🚀
